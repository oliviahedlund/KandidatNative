import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 1,
      elevation: 3,
      backgroundColor: '#e5e4df',
      margin: 10,
    },

    buttonText: {
        color: '#000'
    },

    h1:{
        fontSize: 40,
        paddingTop: 40,
        paddingBottom: 80
    },

    h3: {
        fontSize: 16,
        textAlign:'center',
    },
  
    innerContainer: {
      backgroundColor: '#ffff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,

    },
    
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#ffff',
      alignItems: 'center',      
    },

    navBar: {
        backgroundColor: '#e5e4df'

    }
   
    
   
  });

  export default styles;