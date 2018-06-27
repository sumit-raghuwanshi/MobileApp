import React,{StyleSheet} from 'react-native'
export default StyleSheet.create({
    main_container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(194, 185, 165, 0.31)'
    },
    item_container:{
        height: 44,
        marginBottom: 10,
        backgroundColor: "#FFFFFF"
    },
    textContainer: {
        paddingHorizontal: 10,
        justifyContent: 'center'
    },
    title: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontSize: 17
    },
    imageContainer: { 
        alignItems: 'flex-end', justifyContent: 'center' 
    },
    button_container:{
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 15,
        justifyContent: 'space-between'
    },
    header: {
        flexDirection: 'row',
        height: 66,
        backgroundColor: '#354052',
        zIndex: 1
      }
})