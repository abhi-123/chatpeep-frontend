import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { useSession } from "../auth/ctx";

const tnc = () => {
  const { deleteUser } = useSession();
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.tcP}>
          Welcome to our website. If you continue to browse and use this
          website, you are agreeing to comply with and be bound by the following
          terms and conditions of use, which together with our privacy policy
          govern [business name]’s relationship with you in relation to this
          website. If you disagree with any part of these terms and conditions,
          please do not use our website.
        </Text>
        <Text style={styles.tcP}>
          The term ‘[business name]’ or ‘us’ or ‘we’ refers to the owner of the
          website whose registered office is [address]. Our company registration
          number is [company registration number and place of registration]. The
          term ‘you’ refers to the user or viewer of our website.
        </Text>
        <Text style={styles.tcL}>
          {"\u2022"} The content of the pages of this website is for your
          general information and use only. It is subject to change without
          notice.
        </Text>
        <Text style={styles.tcL}>
          {"\u2022"} This website uses cookies to monitor browsing preferences.
          If you do allow cookies to be used, the following personal information
          may be stored by us for use by third parties: [insert list of
          information].
        </Text>
        <Text style={styles.tcL}>
          {"\u2022"} Neither we nor any third parties provide any warranty or
          guarantee as to the accuracy, timeliness, performance, completeness or
          suitability of the information and materials found or offered on this
          website for any particular purpose. You acknowledge that such
          information and materials may contain inaccuracies or errors and we
          expressly exclude liability for any such inaccuracies or errors to the
          fullest extent permitted by law.
        </Text>
        <Text style={styles.tcL}>
          {"\u2022"} Your use of any information or materials on this website is
          entirely at your own risk, for which we shall not be liable. It shall
          be your own responsibility to ensure that any products, services or
          information available through this website meet your specific
          requirements.
        </Text>
        <Text style={styles.tcL}>
          {"\u2022"} This website contains material which is owned by or
          licensed to us. This material includes, but is not limited to, the
          design, layout, look, appearance and graphics. Reproduction is
          prohibited other than in accordance with the copyright notice, which
          forms part of these terms and conditions.
        </Text>
        <Text style={styles.tcL}>
          {"\u2022"} All trademarks reproduced in this website, which are not
          the property of, or licensed to the operator, are acknowledged on the
          website. Unauthorised use of this website may give rise to a claim for
          damages and/or be a criminal offence.
        </Text>
        <Text style={styles.tcL}>
          {"\u2022"} From time to time, this website may also include links to
          other websites. These links are provided for your convenience to
          provide further information. They do not signify that we endorse the
          website(s). We have no responsibility for the content of the linked
          website(s).
        </Text>
        <Text style={styles.tcL}>
          {"\u2022"} Your use of this website and any dispute arising out of
          such use of the website is subject to the laws of England, Northern
          Ireland, Scotland and Wales.
        </Text>
        <Text style={styles.tcP}>
          The use of this website is subject to the following terms of use
        </Text>
      </View>
      <View style={styles.button}>
        <Pressable
          style={{ justifyContent: "center", paddingTop: 10, width: "auto" }}
          onPress={() => deleteUser()}
        >
          <Text style={styles.text}>Delete User</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    alignSelf: "center",
  },
  tcP: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
  },
  tcP: {
    marginTop: 10,
    fontSize: 12,
  },
  tcL: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
  },
  tcContainer: {
    marginTop: 15,
    marginBottom: 15,
    height: height * 0.7,
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
    // height: 30,
    //backgroundColor: "#ec5990",
    //  borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#ec5990",
    textAlign: "center",
  },
});

export default tnc;
