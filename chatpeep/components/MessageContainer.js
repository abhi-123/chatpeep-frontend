import { View, Text ,FlatList,StyleSheet,StatusBar} from 'react-native'
import React, { useState,useEffect } from 'react'


const MessageContainer = ({messageList}) => {
    console.log(messageList);
    // useEffect(() => {
      
    //     setMessageList((prevMessages) => {
    //         console.log(messageList);
    //         if(newMessage?.time) {
    //         console.log('in first ',prevMessages)
    //             return [...prevMessages,newMessage]
    //         }
    //     });
    //   return () => {
       
    //   }
    // }, [newMessage])

    
  return (
    <View style={{flex:1 ,backgroundColor:'#ccc' , justifyContent:'center', alignItems:'center'}}>
     {messageList.length > 0 ? 
    <FlatList  style={styles.container}
    data={messageList}
    renderItem={({item,index}) =>
    <>
    <View style={[styles.item, index % 2 == 0 ? styles.rightChat : styles.leftChat]}>
      <Text style={styles.title}>{item?.text}</Text>
    </View>
    <View style={index % 2 == 0 ? styles.rightTime : styles.leftTime}>
         <Text style={styles.time}>{item?.time}</Text>
    </View>
    </>
}
   keyExtractor={(item, index) => String(index)}
  />
     : 
     
     <Text>Let's Ready for the Chat...</Text> 
     }
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
    // flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    
    //  backgroundColor:'wheat'
    },
    item: {
      padding: 10,
      margin:5,
      //marginVertical: 8,
      //marginHorizontal: 16,
      //width: '90%',
      minHeight: 50,
      flexDirection: 'row',
      //justifyContent: 'space-between'
    },
    rightChat: {
        marginLeft: 100,
        backgroundColor: '#fff',
    },
    leftChat: {
        marginRight: 100,
        backgroundColor: '#eee',
    },
    title: {
      fontSize: 18,
      width:'90%'
    },
    rightTime: {
  alignItems: 'flex-end'
    },
    leftTime: {
  alignItems: 'flex-start'
    },
    time: {
        fontSize: 10,
        width:'10%',
        marginLeft:10

    }
  });

export default MessageContainer