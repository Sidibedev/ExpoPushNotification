import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: {},
    };
  }
  componentDidMount() {
    this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }
  _handleNotification = notification => {
    // On recoit l'objet notification qui contient nos données
    this.setState({ notification: notification });
  };

  async registerForPushNotificationsAsync() {
    // On demande la permission
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    // Si la permission n'est pas accordée on fait rien.
    if (status !== "granted") {
      alert("No notification permissions!");
      return;
    }
    // On récupére le token qu'on affiche dans la console
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
  }
  component

  render() {
   return (
       <View style={styles.container}>
          <Text> {JSON.stringify(this.state.notification.data)}  </Text>
       </View>
     );
   }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
