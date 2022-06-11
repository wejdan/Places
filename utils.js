import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'PlacesDatabase.db'});
const createTable = () => {
  db.transaction(tx => {
    txn.executeSql(
      'CREATE TABLE IF NOT EXISTS table_places(place_id INTEGER PRIMARY KEY, place_title VARCHAR(255), place_img VARCHAR(255), place_name VARCHAR(255), place_address VARCHAR(255))',
    );
  });
};

const getData = () => {
  db.transaction(tx => {
    txn.executeSql(
      'CREATE TABLE IF NOT EXISTS table_places(place_id INTEGER PRIMARY KEY, place_title VARCHAR(255), place_img VARCHAR(255), place_name VARCHAR(255), place_address VARCHAR(255))',
    );
  });
};

const setData = () => {
  db.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO table_places (place_id, place_title, place_img, place_name, place_address,) VALUES (?,?,?,?,?)',
      [userName, userContact, userAddress],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Success',
            'You are Registered Successfully',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('HomeScreen'),
              },
            ],
            {cancelable: false},
          );
        } else alert('Registration Failed');
      },
    );
  });
};
export function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + '...';
  } else {
    return str;
  }
}
