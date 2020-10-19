import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import PopupDetail from "../components/PopupDetail";

export default function Cart() {
  return (
    <View style={styles.container}>
      <View style={styles.cardsWrapper}>
        <ScrollView>
          <Text
            style={{
              alignSelf: "flex-start",
              fontSize: 18,
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Order Summary
          </Text>
          <View style={styles.card}>
            <View style={styles.cardImgWrapper}>
              <Image
                source={{
                  uri:
                    "https://cdn0-production-images-kly.akamaized.net/VP_bhRn3rKvm5A7do_xW44QkFvU=/1593x0:4329x3649/375x500/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2972859/original/085912400_1574242860-shutterstock_1148861465.jpg",
                }}
                resizeMode="cover"
                style={styles.cardImg}
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Amazing Food Place</Text>
              {/* <StarRating ratings={4} reviews={99} /> */}
              <Text style={styles.cardDetails}>
                Amazing description for this amazing place
              </Text>
              <View style={styles.cardPrice}>
                <Text style={{ fontSize: "20em" }}>Rp.25.000</Text>
                <Button style={styles.buttonEdit} title="Edit" />
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardImgWrapper}>
              <Image
                source={{
                  uri:
                    "https://cdn0-production-images-kly.akamaized.net/VP_bhRn3rKvm5A7do_xW44QkFvU=/1593x0:4329x3649/375x500/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2972859/original/085912400_1574242860-shutterstock_1148861465.jpg",
                }}
                resizeMode="cover"
                style={styles.cardImg}
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Amazing Food Place</Text>
              {/* <StarRating ratings={4} reviews={99} /> */}
              <Text style={styles.cardDetails}>
                Amazing description for this amazing place
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.paymentSummaryContainer}>
          <View style={styles.endLabelContainer}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceLabel}>Booking fee</Text>
            <Text style={styles.priceLabel}>Total</Text>
          </View>

          <View>
            <Text style={styles.price}>Rp.50.000</Text>
            <Text style={styles.price}>Rp.5.000</Text>
            <Text style={styles.price}>Rp.55.000</Text>
          </View>
        </View>
        <View style={styles.paymentMethod}>
          <Text
            style={{
              alignSelf: "flex-start",
              fontSize: 18,
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Payment Method
          </Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <Button style={styles.buttonPay} title="Pay Now" />
      </View>
      <PopupDetail />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsWrapper: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: "row",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontWeight: "bold",
  },
  cardDetails: {
    fontSize: 12,
    color: "#444",
  },
  cardPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paymentMethod: {
    marginTop: 100,
    width: "90%",
    alignSelf: "center",
  },
  buttonPay: {
    position: "absolute",
    flex: 1,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 50,
  },
  paymentSummaryContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 20,
  },
  endLabelContainer: {
    alignItems: "flex-end",
    paddingRight: 20,
  },
  price: {
    fontSize: 17,
    fontWeight: "bold",
  },
  priceLabel: {
    fontSize: 16,
  },
});
