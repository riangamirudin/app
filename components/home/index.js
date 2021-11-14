import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, ActivityIndicator, FlatList } from 'react-native';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const userid = await AsyncStorage.getItem('uid');
    const token = await AsyncStorage.getItem('token');
        
    fetch('http://gmedia.bz/DemoCase/main/list_karyawan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Service': 'gmedia-recruitment',
        'Auth-Key': 'demo-admin',
        'User-Id': userid,
        'Token': token,
      },
      body: JSON.stringify({
        "start":0,
        "count":10
      })
    })
    .then(async (response) => response.json())
    .then(async ({metadata, response}) => {
        setLoading(false);
        if(metadata.status == 200){
          
          setData(response);
        }
        else{
          setError(metadata.message);
        }
      }
    )
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setError(null);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const renderData = (data) => {
    return (<Text>{data}</Text>);
  }

  return (
    <View>
      {
        loading && <ActivityIndicator size="small" color="#B983FF" />        
      }
      {
         data.length > 0 && (
          data.map(item => (<Text key={item['nip']}>{item['nama']}</Text>))
        )
      }
    </View>
  );
}

export default Home;