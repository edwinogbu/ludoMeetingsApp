import { View, StyleSheet, Dimensions, TouchableOpacity, Share, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';

import Spinner from 'react-native-loading-spinner-overlay';
import {
    Call,
    CallContent,
    StreamCall,
    StreamVideoEvent,
    useStreamVideoClient
} from '@stream-io/video-react-native-sdk';
import Toast from 'react-native-toast-message';

import { Ionicons } from '@expo/vector-icons';
import CustomBottomSheet from '../../../components/CustomBottomSheet';
import ChatView from '../../../components/ChatView';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Page = () => {
    const { id } = useLocalSearchParams<{ id: string | string[] }>();
    const callId = Array.isArray(id) ? id[0] : id;
    
    const router = useRouter();
    const navigation = useNavigation();
    const client = useStreamVideoClient();

    const [call, setCall] = useState<Call | null>(null);

    // Join the call
    useEffect(() => {
        if (!client || call) return;

        const joinCall = async () => {
            const newCall = client.call('default', callId as string);
            await newCall.join({ create: true });
            setCall(newCall);
        };

        joinCall();
    }, [call, client, callId]);

    useEffect(() => {
        if (!client) return;

        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={shareMeeting}>
                    <Ionicons name="share-outline" size={24} color="white" />
                </TouchableOpacity>
            )
        });

        // Listen to call events
        const unsubscribe = client.on('all', (event: StreamVideoEvent) => {
            console.log(event);

            if (event?.type === 'call.reaction_new') {
                console.log(`New reaction: ${event?.reaction}`);
            }

            if (event?.type === 'call.session_participant_joined') {
                const user = event?.participant?.user?.name ?? 'Unknown User';
                Toast.show({
                    text1: 'User joined',
                    text2: `Say hello to ${user} 👋`
                });
            }

            if (event?.type === 'call.session_participant_left') {
                const user = event?.participant?.user?.name ?? 'Unknown User';
                Toast.show({
                    text1: 'User left',
                    text2: `Say goodbye to ${user} 👋`
                });
            }
        });

        return () => {
            unsubscribe();
        };
    }, [client]);

    // Navigate back home on hangup
    const goToHomeScreen = async () => {
        router.back();
    };

    // Share the meeting link
    const shareMeeting = async () => {
        Share.share({
            message: `Join my meeting: myapp://(inside)/(room)/${callId}`
        });
    };

    if (!call) return null;

    return (
        <View style={{ flex: 1 }}>
            <Spinner visible={!call} />

            <StreamCall call={call}>
                <View style={styles.container}>
                    <CallContent onHangupCallHandler={goToHomeScreen} layout="grid" />

                    {WIDTH > HEIGHT ? (
                        <View style={styles.videoContainer}>
                            <Text>Tablet chat</Text>
                        </View>
                    ) : (
                        <Text>Mobile chat</Text>
                    )}
                </View>
            </StreamCall>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: WIDTH > HEIGHT ? 'row' : 'column'
    },
    videoContainer: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#fff'
    },
    topView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
});

export default Page;


// import { View, StyleSheet, Dimensions, TouchableOpacity, Share, Text } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';

// import Spinner from 'react-native-loading-spinner-overlay';
// import {
// 	Call,
// 	CallContent,
// 	StreamCall,
// 	StreamVideoEvent,
// 	useStreamVideoClient
// } from '@stream-io/video-react-native-sdk';
// import Toast from 'react-native-toast-message';

// import { Ionicons } from '@expo/vector-icons';
// import CustomBottomSheet from '../../../components/CustomBottomSheet';
// import ChatView from '../../../components/ChatView';
// const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;

// const Page = () => {
// 	const { id } = useLocalSearchParams<{ id: string }>();
// 	const router = useRouter();
// 	const navigation = useNavigation();

// 	const [call, setCall] = useState<Call | null>(null);
// 	const client = useStreamVideoClient();

// 	// Join the call
// 	useEffect(() => {
// 		if (!client || call) return;

// 		const joinCall = async () => {
// 			const call = client!.call('default', id);
// 			await call.join({ create: true });
// 			setCall(call);
// 		};

// 		joinCall();
// 	}, [call]);

// 	useEffect(() => {
// 		navigation.setOptions({
// 			headerRight: () => (
// 				<TouchableOpacity onPress={shareMeeting}>
// 					<Ionicons name="share-outline" size={24} color="white" />
// 				</TouchableOpacity>
// 			)
// 		});

// 		// Listen to call events
// 		const unsubscribe = client!.on('all', (event: StreamVideoEvent) => {
// 			console.log(event);

// 			if (event.type === 'call.reaction_new') {
// 				console.log(`New reaction: ${event.reaction}`);
// 			}

// 			if (event.type === 'call.session_participant_joined') {
// 				console.log(`New user joined the call: ${event.participant}`);
// 				const user = event.participant.user.name;
// 				Toast.show({
// 					text1: 'User joined',
// 					text2: `Say hello to ${user} 👋`
// 				});
// 			}

// 			if (event.type === 'call.session_participant_left') {
// 				console.log(`Someone left the call: ${event.participant}`);
// 				const user = event.participant.user.name;
// 				Toast.show({
// 					text1: 'User left',
// 					text2: `Say goodbye to ${user} 👋`
// 				});
// 			}
// 		});

// 		// Stop the listener when the component unmounts
// 		return () => {
// 			unsubscribe();
// 		};
// 	}, []);

// 	// Navigate back home on hangup
// 	const goToHomeScreen = async () => {
// 		router.back();
// 	};

// 	// Share the meeting link
// 	const shareMeeting = async () => {
// 		Share.share({
// 			message: `Join my meeting: myapp://(inside)/(room)/${id}`
// 		});
// 	};

// 	if (!call) return null;

// 	return (
// 		<View style={{ flex: 1 }}>
// 			<Spinner visible={!call} />

// 			<StreamCall call={call}>
// 				<View style={styles.container}>
// 					<CallContent onHangupCallHandler={goToHomeScreen} layout="grid" />

// 					{WIDTH > HEIGHT ? (
// 						<View style={styles.videoContainer}>
// 							<Text>Tablet chat</Text>
// 						</View>
// 					) : (
// 						<Text>Mobile chat</Text>
// 					)}
// 				</View>
// 			</StreamCall>
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		flexDirection: WIDTH > HEIGHT ? 'row' : 'column'
// 	},
// 	videoContainer: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		textAlign: 'center',
// 		backgroundColor: '#fff'
// 	},

// 	topView: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		backgroundColor: '#fff'
// 	}
// });

// export default Page;