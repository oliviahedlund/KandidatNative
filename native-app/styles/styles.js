import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 1,
      elevation: 3,
      backgroundColor: '#803332',
      margin: 10,
    },

    buttonText: {
        color: '#ffff'
    },

    h1:{
        fontSize: 40,
        paddingTop: 40,
        paddingBottom: 80
    },

    h3: {
        fontSize: 16
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
        backgroundColor: '#803332'

    }
   
    
   
  });

  export default styles;