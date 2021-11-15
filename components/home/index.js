import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import Card from "react-bootstrap/Card";

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
    .then((response) => response.json())
    .then(({metadata, response}) => {
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

  const Item = ({ title }) => (
    <View >
      <Text >{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <Text>NIP</Text>
      <Item title={item.nip} />
      <Text>Nama</Text>
      <Item title={item.nama} />
      <Text>Alamat</Text>
      <Item title={item.alamat} />
    </View>
  )

  return (
    <View>
      {
        loading && <ActivityIndicator size="small" color="#B983FF" />        
      }
      
      {/* {
         data.length > 0 && (
          data.map(item => (
          <Text key={item['nip']}>{item['nama']}</Text>
          // <View>
          //   <Card>
          //     <Card.Body>This is some text within a card body.</Card.Body>
          //   </Card>
          // </View>
          ))
        )
      } */}

      <FlatList
        data={data}
        keyExtractor={item => item.nip}
        renderItem={renderItem}
      />
      
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {  
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
  },
});