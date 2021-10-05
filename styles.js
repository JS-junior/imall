import { StyleSheet, Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window')

export default  StyleSheet.create({
  container: {
    display: 'flex',
		flex: 1,
		height: height,
		width: width
  },
signupHeading: {
		fontWeight: 'bold',
		alignText: 'center',
		color: 'white'
	},
signupCaption: {
		marginTop: '30%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},

	captionText: {
		color: '#FFF',
		fontWeight: '1000',
		color: '#833471'
	},

	captionMain: {
		fontWeight: '1000',
		fongSize: 20,
	},
	
	signupButton: {
		width: '100%',
		height: 50,
		color: 'white',
		backgroundColor: '#833471',
		marginTop: 12,
		fontWeight: 'bold',
		fontSize: 16,
		textAlign: 'center',
		borderRadius: 6,
		paddingVertical: 12
	},
signupContainer: {
		display: 'flex',
		flex: 1,
	        justifyContent: 'center',
		height: height,
		width: width
	},
normalInput: {
		width: '100%',
		height: 45,
		backgroundColor: '#333',
		marginTop: 10,
		borderRadius: 6,
		paddingHorizontal: 10,
		fontSize: 16,
		color: '#808e9b'
	},
	productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'MontserratExtraBold',
  },
  productbtnContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buyBtn: {
    flex: 1,
    backgroundColor: '#111',
    paddingVertical: 7,
    color: 'white',
    fontWeight: 'bold',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  addToCartBtn: {
    flex: 1,
    backgroundColor: '#fff',
    height: 50,
    paddingVertical: 7,
    color: 'black',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    borderRadius: 4,
    borderWidth: 1,
  },
  addToCartText: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 7,
    color: 'black',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    borderRadius: 4,
  },
  productsContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    width: width,
    alignItems: 'center',
    paddingLeft: 50
  },
  moreProductContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 2,
    width: '50%',
  },
  moreProductImage: {
    height: 100,
    width: 110,
    borderRadius: 4,
    marginBottom: 20,
  },
  reviewContainer: {
    height: 80,
    backgroundColor: 'white',
  },
  productUpperCaption: {
    fontWeight: 'bold',
    fontFamily: 'MontserratBold',
    fontSize: 21,
    marginVertical: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  productMoreTxt: {
    fontWeight: 'bold',
    fontFamily: 'MontserratBold',
    fontSize: 21,
    borderRadius: 4,
    borderWidth: 1,
    marginVertical: 10,
    paddingVertical: 10,
  },
  productImage: {
    height: height / 2,
    width: width,
  },
  cartContainer: {
    backgroundColor: '#333',
    height: height,
    width: width,
    padding: 5,
  },

  scrollViewContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    zIndex: 1,
    height: '80%',
    width: "95%",
    marginHorizontal: 3,
    marginTop: 20
  },

  subTotalContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    height: 40,
  },

  sideItemText: {
    position: 'absolute',
    right: 2,
    fontWeight: 'bold',
  },

  checkoutButton: {
    textAlign: 'center',
    backgroundColor: 'black',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 19,
    height: 50,
    width: '100%',
    paddingTop: 12,
    marginVertical: 10,
    borderRadius: 6,
  },
  
  homeContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 10,
    backgroundColor: 'white',
  },


  homeBoxContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 'auto',
    width: '100%',
    flexWrap: 'wrap',
  },
  boxContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 170,
    width: '45%',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
         

 homeBoxContainer: {
       display: 'flex',
       flexDirection: 'row',      
       justifyContent: 'center',
       alignItems: 'center',                         
       height: 'auto',
       width: '100%',
       flexWrap: 'wrap',
        },                                                                                                                                                                                              
        boxContainer: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: 170,
                width: '45%',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 10,
        },
         productMoreTxt: {
                fontWeight: 'bold',
                fontFamily: 'MontserratBold',
                fontSize: 21,
                marginVertical: 10,
                paddingVertical: 10,
        },

        boxContainerImage: {
                height: '100%',
                width: '100%',
                borderRadius: 4,
        },
        carouselImage: {
                height: 120,
                alignSelf: 'center',
                width: '90%',
        },

        carouselCard: {
                width: width,
                height: 150,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
        },
        
historyContainer: {
                display: 'flex',
                flexDirection: 'column',
                width: width,
                height: height,
                marginVertical: 10,
        },
orderContainer: {
display: "flex",
flex: 1,
flexDirection: "row",
height: 3,
justifyContent: "space-between"
},

refundBtn: {
borderRadius: 10,
backgroundColor: "#000",
marginLeft: 30,
width: 90,
height: 20,
textAlign: 'center'
},        
historyCard: {
     height: height / 6,
     width: '90%',
     marginTop: 10,
     backgroundColor: 'white',
        },

 historyCardImage: {
    height: '100%',
    width: '20%',
        },
 searchContainer: {
    height: height,
    width: width,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  searchCard: {
    width: '90%',
    height: height / 4,
    backgroundColor: 'white',
    marginVertical: 25,
    marginHorizontal: 15,
  },

  searchCardImage: {
    height: '70%',
    width: '20%',
  },
settingsCard: {
    height: height / 10,
    width: '90%',
        },

 settingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
        },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0, 
    bottom: 0,
    height: 50,
    borderTopWidth: 1,
    borderTopColor: '#dfe4ea',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentContainer: {
  display: 'flex',
  flexDirection: "column",
  justifyContent: 'center',
},
paymentInput: {
width: '100%',
height: 44,
alignSelf: 'center',
width: '90%',
backgroundColor: "#f1f3f6",
borderRadius: 8,
paddingHorizontal: 10,
borderWidth: 1,
display: 'flex',
flexDirection: 'row',
alignItems: "center",
marginVertical: 10
},
  payBtn: {
  marginVertical: 10,
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 6,
  width: "90%",
  backgroundColor: 'black',
  alignSelf: 'center',
  justifyContent: 'center',
  },
  payBtnTxt: {
  color: "#fff",
  fontWeight: 'bold',
  alignSelf: 'center',
  fontSize: 20
  },
  
forgotpassModal: {
backgroundColor: "#FFF",
paddingHorizontal: 10,
paddingVertical: 14,
borderRadius: 8,
shadowColor: "#000",
shadowOffset: { width: 0, height:2 },
shadowOpacity: 0.25,
shadowRadius: 3.85,
elevation: 5,
},
normalInput: {
		width: '100%',
		height: 45,
		backgroundColor: '#333',
		marginTop: 10,
		borderRadius: 6,
		paddingHorizontal: 10,
		fontSize: 16,
		color: '#808e9b'
	},


forgotpassbtn: {
backgroundColor: "black",
paddingHorizontal: 10,
paddingVertical: 14,
borderRadius: 8,
height: 'auto',
width: '25%',
shadowColor: "#000",
shadowOffset: { width: 2, height:2 },
shadowOpacity: 0.25,
shadowRadius: 3.85,
elevation: 2,
marginLeft: 10
}
})
