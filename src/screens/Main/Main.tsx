import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FlatList, Image, ListRenderItem, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// types
import { MotorcycleType } from "../../providers/MotorcyclesProvider/MotorcyclesProvider.types";
import { RootMainScreensParamList } from "../../navigation/Navigators.types";

// providers
import { motorcyclesContext } from "../../providers/MotorcyclesProvider/MotorcyclesProvider";

// components
import { RenderItem } from "../../components/RenderItem/RenderItem";
import { FilterModal, FilterType } from "./components/FilterModal/FilterModal";
import { Header } from "../../components/Header/Header";

// images
import backgroundImage from "../../../assets/images/background.jpeg";

// styles
import { styles } from "./Main.styles";

type MainProps = {
  navigation: NativeStackNavigationProp<RootMainScreensParamList>;
};

export const Main: FunctionComponent<MainProps> = ({ navigation }) => {
  const { motorcyclesDB } = useContext(motorcyclesContext);
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [amountShow, setAmountShow] = useState(20);
  const [filter, setFilter] = useState<FilterType | null>(null);
  const showMotorcycles = useMemo(
    () =>
      motorcyclesDB
        .filter((moto) =>
          filter
            ? filter.selectBrands.length
              ? filter.selectBrands.includes(moto.Brand)
              : true &&
                moto.Year >= filter.selectYears.min &&
                moto.Year <= filter.selectYears.max
            : true
        )
        .filter((moto) =>
          valueSearch.length
            ? moto.Brand.toLocaleLowerCase().includes(
                valueSearch.toLocaleLowerCase()
              ) ||
              moto.Model.toString()
                .toLocaleLowerCase()
                .includes(valueSearch.toLocaleLowerCase())
            : moto
        )
        .splice(0, amountShow),
    [motorcyclesDB, valueSearch, amountShow, filter]
  );
  const amountShowMotorcycles = useMemo(
    () => showMotorcycles.length,
    [showMotorcycles]
  );
  const amountAllMotorcycles = useMemo(
    () => motorcyclesDB.length,
    [motorcyclesDB]
  );

  const renderItem: ListRenderItem<MotorcycleType> = ({ item }) => {
    return (
      <RenderItem key={`moto-${item.id}`} navigation={navigation} item={item} />
    );
  };

  useEffect(() => {
    setAmountShow(20);
  }, [filter]);

  return (
    <>
      <View style={styles.container}>
        <Image source={backgroundImage} style={styles.imageBackground} />
        <Header
          navigation={navigation}
          isShowSearch={isShowSearch}
          setIsShowSearch={setIsShowSearch}
          valueSearch={valueSearch}
          setValueSearch={setValueSearch}
          amountShowMotorcycles={amountShowMotorcycles}
          amountAllMotorcycles={amountAllMotorcycles}
          isShowFilter={isShowFilter}
          setIsShowFilter={() => {
            setIsShowFilter(true);
          }}
        />
        <FlatList
          data={showMotorcycles}
          renderItem={renderItem}
          onEndReached={() => {
            setAmountShow((state) => state + 20);
          }}
          contentContainerStyle={styles.containerList}
        />
      </View>
      <FilterModal
        isShowFilter={isShowFilter}
        setIsShowFilter={setIsShowFilter}
        filterState={filter}
        onSubmit={setFilter}
      />
    </>
  );
};
