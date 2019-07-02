const style = {
  containerFluid: {
    display: 'flex',
    flex: '1',
    height: '100vh',
    backgroundImage: "url(https://hdqwalls.com/wallpapers/city-blurred-hd.jpg)",
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },

  newsContainer: {
    padding: '50px',
    marginTop: '50px',
    marginLeft: '300px',
    height: '700px',
    width: '1100px',
    backgroundColor: 'white',
    border: '1px solid transparent',
    boxShadow: '1px 1px 5px black',
    borderRadius: '1%',
    overflow: 'scroll'
  },

  newsFeedText: {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxFlex: '-1',
    WebkitLineClamp: '4',
    WebkitBoxOrient: 'vertical',
    maxWidth: '800px',
  },

  listContainer: {
    border: '1px solid transparent',
    boxShadow: '1px 1px 2px gray',
    marginBottom: '5px',
    overflowX: 'scroll'
  },

  listStyle: {
    width: '100%',
    backgroundColor: 'lightergray',
  },

  loginButton: {
    color: 'white',
    backgroundColor: '#007bff',
    marginTop: '30px',
    minWidth: '100%'
  },

  avatarConatainer: {
    marginRight: '20px'
  }

};

export default style;