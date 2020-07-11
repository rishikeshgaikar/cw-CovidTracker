import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  StatusBar,
  ActivityIndicator,
  Image,
} from 'react-native';
import axios from 'axios';
import {covid19url} from '../../res/constants';
import {
  RootView,
  Card,
  TotalCountCard,
  CustomButton,
  Header,
} from '../components';
import R from '../R';
import Icon from 'react-native-vector-icons/Feather';
import RangeSlider from 'rn-range-slider';
import AsyncStorage from '@react-native-community/async-storage';

export const Home = () => {
  const [Data, setData] = useState({
    Countries: [],
    Global: {},
    Date: '',
  });
  const [OgData, setOgData] = useState({
    Countries: [],
    Global: {},
    Date: '',
  });
  const [MyCountryData, setMyCountryData] = useState({});
  const [SortedData, setSortedData] = useState({
    Country: true,
    TotalConfirmed: false,
    TotalDeaths: false,
    TotalRecovered: false,
  });
  const [RangeData, setRangeData] = useState({
    TotalConfirmedLow: 0,
    TotalConfirmedHigh: 1000000,
    TotalDeathsLow: 0,
    TotalDeathsHigh: 1000000,
    TotalRecoveredLow: 0,
    TotalRecoveredHigh: 1000000,
  });
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(false);
  const [RefreshFlatList, setRefreshFlatList] = useState(false);
  const [ShowModal, setShowModal] = useState(false);

  useEffect(() => {
    apiCall(0);
    setTimeout(() => {
      apiCall(1);
    }, 120000);
  }, []);

  const apiCall = (isIntervalCall) => {
    axios
      .get(covid19url)
      .then((res) => {
        if (res.status == 200) {
          if (isIntervalCall == 0) {
            setData(res.data);
            setOgData(res.data);
            getData(res.data.Countries);
            setLoading(false);
          } else {
            setData({...Data, Global: res.data.Global});
          }
        } else {
          console.log('Error');
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  };

  const getData = async (arr) => {
    try {
      const value = await AsyncStorage.getItem('myCountry');
      if (value !== null) {
        console.log(value);
        console.log(arr);
        const test = arr.find((a) => a.CountryCode == 'IN');
        console.log(test);
        setMyCountryData(test);
      }
    } catch (e) {
      // error reading value
    }
  };

  const renderFlatListheader = () => {
    return (
      <View style={{backgroundColor: R.colors.white}}>
        <Card color={R.colors.green}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1.4}}>
              <Header
                icon={SortedData.Country}
                title={'Country'}
                onPress={() => {
                  setSortedData({...SortedData, Country: !SortedData.Country});
                  sortCountry();
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <Header
                icon={SortedData.TotalConfirmed}
                title={'Confirmed'}
                onPress={() => {
                  setSortedData({
                    ...SortedData,
                    TotalConfirmed: !SortedData.TotalConfirmed,
                  });
                  sortTotalConfirmed();
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <Header
                icon={SortedData.TotalDeaths}
                title={'Confirmed'}
                title={'Deaths'}
                onPress={() => {
                  setSortedData({
                    ...SortedData,
                    TotalDeaths: !SortedData.TotalDeaths,
                  });
                  sortTotalDeaths();
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <Header
                icon={SortedData.TotalRecovered}
                title={'Confirmed'}
                title={'Recovered'}
                onPress={() => {
                  setSortedData({
                    ...SortedData,
                    TotalRecovered: !SortedData.TotalRecovered,
                  });
                  sortTotalRecovered();
                }}
              />
            </View>
          </View>
        </Card>
        <Card color={R.colors.blue}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                flex: 1.4,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: R.dimensions.hp('2%'),
              }}>
              {MyCountryData.Country}
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: R.dimensions.hp('2%'),
              }}>
              {MyCountryData.TotalConfirmed}
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: R.dimensions.hp('2%'),
              }}>
              {MyCountryData.TotalDeaths}
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: R.dimensions.hp('2%'),
              }}>
              {MyCountryData.TotalRecovered}
            </Text>
          </View>
        </Card>
      </View>
    );
  };

  const renderFlatListItem = ({item}) => {
    if (item.TotalConfirmed != 0) {
      return (
        <Card>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                flex: 1.4,
                textAlign: 'center',
                fontSize: R.dimensions.hp('2%'),
              }}>
              {item.Country}
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: R.dimensions.hp('2%'),
              }}>
              {item.TotalConfirmed}
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: R.dimensions.hp('2%'),
              }}>
              {item.TotalDeaths}
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: R.dimensions.hp('2%'),
              }}>
              {item.TotalRecovered}
            </Text>
          </View>
        </Card>
      );
    } else {
      return null;
    }
  };

  const sortTotalConfirmed = () => {
    if (SortedData.TotalConfirmed) {
      //descending
      const test = Data.Countries.sort(
        (a, b) => b.TotalConfirmed - a.TotalConfirmed,
      );
      setData({...Data, Countries: test});
      setRefreshFlatList(!RefreshFlatList);
    } else {
      //ascending
      const test = Data.Countries.sort(
        (a, b) => a.TotalConfirmed - b.TotalConfirmed,
      );
      setData({...Data, Countries: test});
      setRefreshFlatList(!RefreshFlatList);
    }
  };
  const sortCountry = () => {
    console.log(SortedData.Country);
    if (SortedData.Country) {
      console.log(SortedData.Country);
      console.log('descending');
      //descending
      console.log(Data);
      const test = Data.Countries.sort((a, b) =>
        a.Country < b.Country ? 1 : a.Country > b.Country ? -1 : 0,
      );
      console.log(test);
      setData({...Data, Countries: test});
      console.log(Data);
      setRefreshFlatList(!RefreshFlatList);
    } else {
      console.log(SortedData.Country);
      console.log('ascending');
      //ascending
      const test = Data.Countries.sort((a, b) =>
        a.Country > b.Country ? 1 : a.Country < b.Country ? -1 : 0,
      );
      setData({...Data, Countries: test});
      setRefreshFlatList(!RefreshFlatList);
    }
  };
  const sortTotalRecovered = () => {
    if (SortedData.TotalRecovered) {
      //descending
      const test = Data.Countries.sort(
        (a, b) => b.TotalRecovered - a.TotalRecovered,
      );
      setData({...Data, Countries: test});
      setRefreshFlatList(!RefreshFlatList);
    } else {
      //ascending
      const test = Data.Countries.sort(
        (a, b) => a.TotalRecovered - b.TotalRecovered,
      );
      setData({...Data, Countries: test});
      setRefreshFlatList(!RefreshFlatList);
    }
  };
  const sortTotalDeaths = () => {
    if (SortedData.TotalDeaths) {
      //descending
      const test = Data.Countries.sort((a, b) => b.TotalDeaths - a.TotalDeaths);
      setData({...Data, Countries: test});
      setRefreshFlatList(!RefreshFlatList);
    } else {
      //ascending
      const test = Data.Countries.sort((a, b) => a.TotalDeaths - b.TotalDeaths);
      setData({...Data, Countries: test});
      setRefreshFlatList(!RefreshFlatList);
    }
  };

  const filterTotalConfirmed = () => {
    console.log(RangeData);
    var test = Data.Countries.filter(
      (test) =>
        test.TotalConfirmed >= RangeData.TotalConfirmedLow &&
        test.TotalConfirmed <= RangeData.TotalConfirmedHigh,
    );
    console.log(test);
    setData({...Data, Countries: test});
    setRefreshFlatList(!RefreshFlatList);
  };
  const filterTotalDeaths = () => {
    console.log(RangeData);
    var test = Data.Countries.filter(
      (test) =>
        test.TotalDeaths >= RangeData.TotalDeathsLow &&
        test.TotalDeaths <= RangeData.TotalDeathsHigh,
    );
    setData({...Data, Countries: test});
    setRefreshFlatList(!RefreshFlatList);
  };
  const filterTotalRecovered = () => {
    console.log(RangeData);
    var test = Data.Countries.filter(
      (test) =>
        test.TotalRecovered >= RangeData.TotalRecoveredLow &&
        test.TotalRecovered <= RangeData.TotalRecoveredHigh,
    );
    setData({...Data, Countries: test});
    setRefreshFlatList(!RefreshFlatList);
  };

  if (Loading) {
    return (
      <RootView style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image source={R.images.virus} />
        <ActivityIndicator
          size={'large'}
          color={R.colors.green}
          style={{marginVertical: '5%'}}
        />
        <Text style={{fontSize: R.dimensions.hp('2%')}}>
          Let's all do our part by staying apart.
        </Text>
      </RootView>
    );
  } else if (Error) {
    return (
      <RootView style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image source={R.images.virus} />
        <Text
          style={{
            fontSize: R.dimensions.hp('2%'),
            margin: '10%',
            textAlign: 'center',
          }}>
          Something went wrong check your network connection or try agian later.
        </Text>
      </RootView>
    );
  } else {
    return (
      <RootView>
        <View
          style={{
            flex: 0.6,
            marginHorizontal: '3%',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: R.dimensions.hp('4%')}}>CovidTracker</Text>
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Icon name={'align-justify'} size={R.dimensions.hp('5%')}></Icon>
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.6, flexDirection: 'row'}}>
          <TotalCountCard
            color={R.colors.pink}
            title={'Total Cases'}
            count={Data.Global.TotalConfirmed}
          />
          <TotalCountCard
            color={R.colors.red}
            title={'Deaths'}
            count={Data.Global.TotalDeaths}
          />
          <TotalCountCard
            color={R.colors.green}
            title={'Recovered'}
            count={Data.Global.TotalRecovered}
          />
        </View>
        <View style={{flex: 4}}>
          <FlatList
            data={Data.Countries}
            extraData={RefreshFlatList}
            renderItem={renderFlatListItem}
            ListHeaderComponent={renderFlatListheader}
            stickyHeaderIndices={[0]}
            keyExtractor={(item, index) => item.Country.toString()}
          />
        </View>
        <Modal visible={ShowModal} transparent={true} animationType="slide">
          <StatusBar
            backgroundColor={R.colors.modal}
            barStyle={'light-content'}></StatusBar>
          <View style={{flex: 1}}>
            <View style={{flex: 1, backgroundColor: R.colors.modal}}>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={{height: '100%', width: '100%'}}
              />
            </View>
            <View
              style={{flex: 1, backgroundColor: R.colors.white, padding: '5%'}}>
              <View style={{flex: 1}}>
                <Text>Total Confirmed</Text>
                <RangeSlider
                  style={{width: '100%', height: 80}}
                  gravity={'center'}
                  min={0}
                  max={Data.Global.TotalConfirmed}
                  initialLowValue={RangeData.TotalConfirmedLow}
                  initialHighValue={RangeData.TotalConfirmedHigh}
                  step={1000}
                  selectionColor={R.colors.green}
                  blankColor={R.colors.red}
                  lineWidth={6}
                  onValueChanged={(low, high, fromUser) => {
                    setRangeData({
                      ...RangeData,
                      TotalConfirmedLow: low,
                      TotalConfirmedHigh: high,
                    });
                  }}
                />
              </View>
              <View style={{flex: 1}}>
                <Text>Total Deaths </Text>
                <RangeSlider
                  style={{width: '100%', height: 80}}
                  gravity={'center'}
                  min={0}
                  max={Data.Global.TotalDeaths}
                  initialLowValue={RangeData.TotalDeathsLow}
                  initialHighValue={RangeData.TotalDeathsHigh}
                  step={10000}
                  selectionColor={R.colors.green}
                  blankColor={R.colors.red}
                  lineWidth={6}
                  onValueChanged={(low, high, fromUser) => {
                    setRangeData({
                      ...RangeData,
                      TotalDeathsLow: low,
                      TotalDeathsHigh: high,
                    });
                  }}
                />
              </View>
              <View style={{flex: 1}}>
                <Text>Total Recovered </Text>
                <RangeSlider
                  style={{width: '100%', height: 80}}
                  gravity={'center'}
                  min={0}
                  max={Data.Global.TotalRecovered}
                  initialLowValue={RangeData.TotalRecoveredLow}
                  initialHighValue={RangeData.TotalRecoveredHigh}
                  step={1000}
                  selectionColor={R.colors.green}
                  blankColor={R.colors.red}
                  lineWidth={6}
                  onValueChanged={(low, high, fromUser) => {
                    setRangeData({
                      ...RangeData,
                      TotalRecoveredLow: low,
                      TotalRecoveredHigh: high,
                    });
                  }}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <CustomButton
                  color={R.colors.red}
                  title={'Reset'}
                  onPress={() => {
                    setShowModal(false);
                    setData({...Data, Countries: OgData.Countries});
                  }}></CustomButton>
                <CustomButton
                  color={R.colors.blue}
                  title={'Apply'}
                  onPress={() => {
                    setShowModal(false);
                    filterTotalConfirmed();
                  }}></CustomButton>
              </View>
              <View
                style={{
                  position: 'absolute',
                  backgroundColor: R.colors.red,
                  top: -20,
                  left: '50%',
                  right: '50%',
                  height: R.dimensions.hp('5%'),
                  borderRadius: 30,
                }}>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <Icon name={'x'} size={R.dimensions.hp('5%')}></Icon>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </RootView>
    );
  }
};
