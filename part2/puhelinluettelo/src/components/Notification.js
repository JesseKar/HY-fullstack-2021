const Notification = ({ message, isError }) => {

    if(isError === true){
        const style = {
            color: 'red',
            background: 'lightgrey',
            fontSize: 16,
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10
        }
        return (
            <div style={style}>
              {message}
            </div>
          )
    } else if(isError === false){
        const style = {
            color: 'green',
            background: 'lightgrey',
            fontSize: 16,
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10
        }
        return (
            <div style={style}>
              {message}
            </div>
          )
    } else {
        return null
    }
    
  
    
  }

  export default Notification