import { StyleSheet, Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window')

export default  StyleSheet.create({
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
      backgroundColor: 'white'                     
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
        }
})