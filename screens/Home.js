import React, {useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Homedata from '../assets/Homedata';

import {COLORS, FONTS, icons, SIZES} from '../constants';

const Home = ({navigation}) => {
  const [categories, setCategories] = useState(Homedata.categoryData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [restaurants, setRestaurants] = useState(Homedata.restaurantData);
  const [currentLocation, setCurrentLocation] = useState(
    Homedata.initialCurrentLocation,
  );
  const Headertop = () => {
    return (
      <View style={{flexDirection: 'row', height: 50}}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center',
          }}>
          <Image
            source={icons.nearby}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              width: '70%',
              height: '100%',
              backgroundColor: COLORS.lightGray3,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: SIZES.radius,
            }}>
            <Text style={{...FONTS.h3}}>{currentLocation.streetName}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: 'center',
          }}>
          <Image
            source={icons.basket}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  function onSelectCategory(category) {
    let rest = Homedata.restaurantData.filter(b =>
      b.categories.includes(category.id),
    );
    console.log(category);
    console.log(rest);
    setRestaurants(rest);
    setSelectedCategory(category);
  }
  function MainCategory() {
    const renderMainCategory = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 4,
            backgroundColor:
              selectedCategory?.id === item.id ? COLORS.primary : COLORS.white,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: SIZES.padding,
            ...styles.shadow,
          }}
          onPress={() => {
            onSelectCategory(item);
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                selectedCategory?.id === item.id
                  ? COLORS.white
                  : COLORS.lightGray,
            }}>
            <Image
              source={item.icon}
              style={{
                width: 30,
                height: 30,
                marginTop: SIZES.padding2 * 3,
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                marginTop: SIZES.padding * 2,
                color:
                  selectedCategory?.id === item.id
                    ? COLORS.white
                    : COLORS.black,
                ...FONTS.body5,
              }}>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View style={{padding: SIZES.padding * 2}}>
        <Text style={{...FONTS.h1}}>Main</Text>
        <Text style={{...FONTS.h1}}>Categories</Text>
        <FlatList
          data={Homedata.categoryData}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingVertical: SIZES.padding * 2}}
          renderItem={renderMainCategory}
        />
      </View>
    );
  }
  function RenderResList() {
    function getCategoryID(categoryID) {
      let category = Homedata.categoryData.filter(a => a.id === categoryID);
      if (category.length > 0) {
        return category[0].name;
      }
      return '';
    }
    const renderRes = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            marginBottom: SIZES.padding * 2,
          }}
          onPress={() =>
            navigation.navigate('Restaurant', {
              item,
              currentLocation,
            })
          }>
          <View>
            <Image
              source={item.photo}
              resizeMode="cover"
              style={{
                width: '100%',
                height: 200,
                borderRadius: SIZES.radius,
              }}
            />
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                height: 50,
                width: SIZES.width * 0.3,
                backgroundColor: COLORS.white,
                borderTopRightRadius: SIZES.radius,
                borderBottomEndRadius: SIZES.radius,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{...FONTS.h4}}>{item.duration}</Text>
            </View>
          </View>
          <Text style={{...FONTS.body2}}>{item.name}</Text>
          <View
            style={{
              marginTop: SIZES.padding,
              flexDirection: 'row',
            }}>
            <Image
              source={icons.star}
              style={{
                height: 20,
                width: 20,
                tintColor: COLORS.primary,
                marginRight: 10,
              }}
            />
            <Text style={{...FONTS.body3}}>{item.rating}</Text>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10,
              }}>
              {item.categories.map(categoryID => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                    }}
                    key={categoryID}>
                    <Text
                      style={{
                        ...FONTS.body3,
                      }}>
                      {getCategoryID(categoryID)}
                    </Text>
                    <Text style={{...FONTS.h3, color: COLORS.darkgray}}>
                      {' '}
                      .{' '}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <FlatList
        data={restaurants}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}
        renderItem={renderRes}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Headertop />
      <MainCategory />
      <RenderResList />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});
export default Home;
