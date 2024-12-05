import messaging from "@react-native-firebase/messaging";
import notifee, { EventType, AndroidImportance } from "@notifee/react-native";
import { Platform } from 'react-native';

async function onDisplayNotification(title, body, incrementBadgeCount = true) {
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
    });

    // Récupérer le compteur de badge actuel
    const currentBadgeCount = await notifee.getBadgeCount();
    const newBadgeCount = incrementBadgeCount ? currentBadgeCount + 1 : currentBadgeCount;

    // Mettre à jour le badge
    await notifee.setBadgeCount(newBadgeCount);

    // Display the notification
    await notifee.displayNotification({
        title,
        body,
        android: {
            channelId,
            pressAction: {
                id: 'default',
            },
            // Sur Android, les badges sont gérés différemment selon le launcher
            badgeCount: newBadgeCount,
        },
        ios: {
            // Sur iOS, le badge est géré au niveau de l'application
            badgeCount: newBadgeCount,
        }
    });
}

async function clearBadges() {
    try {
        // Réinitialiser le compteur de badge
        await notifee.setBadgeCount(0);

        // Sur iOS, il faut aussi effacer les notifications délivrées
        if (Platform.OS === 'ios') {
            await notifee.clearDeliveredNotifications();
        }

        console.log('Badges cleared successfully');
    } catch (error) {
        console.error('Error clearing badges:', error);
    }
}

function configurePushNotifications() {
    // Gestionnaire d'événements Notifee
    const bootstrapNotifee = async () => {
        // Réinitialiser les badges à l'ouverture de l'app
        await clearBadges();

        // Gestionnaire pour les événements de notification Notifee
        const unsubscribeNotifee = notifee.onForegroundEvent(({ type, detail }) => {
            switch (type) {
                case EventType.PRESS:
                    console.log('User pressed notification', detail.notification);
                    clearBadges(); // Réinitialiser les badges quand l'utilisateur appuie sur une notification
                    break;
                case EventType.DISMISSED:
                    console.log('User dismissed notification', detail.notification);
                    break;
            }
        });

        // Gestionnaire pour les événements en arrière-plan
        notifee.onBackgroundEvent(async ({ type, detail }) => {
            if (type === EventType.PRESS) {
                console.log('User pressed notification from background', detail.notification);
                await clearBadges(); // Réinitialiser les badges quand l'utilisateur appuie sur une notification
            }
        });

        return unsubscribeNotifee;
    };

    // Gestionnaire de notification initiale
    const handleInitialNotification = async () => {
        const remoteMessage = await messaging().getInitialNotification();
        if (remoteMessage) {
            console.log(
                "Notification caused app to open from quit state:",
                remoteMessage.notification
            );

            // Afficher la notification avec Notifee sans incrémenter le badge
            if (remoteMessage.notification) {
                await onDisplayNotification(
                    remoteMessage.notification.title,
                    remoteMessage.notification.body,
                    false // Ne pas incrémenter le badge car l'app vient d'être ouverte
                );
            }

            await clearBadges(); // Réinitialiser les badges
        }
    };

    // Configuration des écouteurs Firebase
    const notificationListeners = [
        messaging().onNotificationOpenedApp(async remoteMessage => {
            console.log(
                "Notification caused app to open from background state:",
                remoteMessage.notification
            );
            await clearBadges(); // Réinitialiser les badges
        }),
        messaging().onMessage(async remoteMessage => {
            console.log("A new FCM message arrived!", remoteMessage);

            // Afficher la notification avec Notifee quand l'app est au premier plan
            if (remoteMessage.notification) {
                await onDisplayNotification(
                    remoteMessage.notification.title,
                    remoteMessage.notification.body
                );
            }
        }),
    ];

    // Gestionnaire de messages en arrière-plan
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log("Message handled in the background!", remoteMessage);

        // Afficher la notification avec Notifee
        if (remoteMessage.notification) {
            await onDisplayNotification(
                remoteMessage.notification.title,
                remoteMessage.notification.body
            );
        }
    });

    // Initialisation
    const init = async () => {
        const unsubscribeNotifee = await bootstrapNotifee();
        await handleInitialNotification();

        // Fonction de nettoyage
        return () => {
            notificationListeners.forEach(listener => listener());
            unsubscribeNotifee();
        };
    };

    return init();
}

export default configurePushNotifications;