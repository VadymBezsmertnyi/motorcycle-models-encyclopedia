import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Alert,
  FlatList,
  ListRenderItem,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// providers
import { motorcyclesContext } from "../../../../providers/MotorcyclesProvider/MotorcyclesProvider";
import { localesContext } from "../../../../../localization/localization.provider";

// components
import { ModalsSheet } from "../../../../components/ModalsSheet/ModalsSheet";
import { Input } from "../../../../components/Input/Input";

// styles
import { styles } from "./FilterModal.styles";

export type FilterType = {
  selectBrands: string[];
  selectYears: {
    min: number;
    max: number;
  };
  selectCategories: string[];
};

type FilterModalProps = {
  filterState: FilterType | null;
  isShowFilter: boolean;
  setIsShowFilter: (value: boolean) => void;
  onSubmit: (values: FilterType) => void;
};

export const FilterModal: FunctionComponent<FilterModalProps> = ({
  filterState,
  isShowFilter,
  setIsShowFilter,
  onSubmit,
}) => {
  const { i18n } = useContext(localesContext);
  const { brands, minMaxYears, categories } = useContext(motorcyclesContext);
  const [selectBrands, setSelectBrands] = useState<string[]>([]);
  const [selectCategories, setSelectCategories] = useState<string[]>([]);
  const [selectYears, setSelectYears] = useState({ min: 0, max: 0 });
  const [amountShow, setAmountShow] = useState(20);
  const [name, setName] = useState("");
  const [nameCategory, setNameCategory] = useState("");
  const showBrands = useMemo(
    () =>
      (name.length
        ? [...brands].filter((brand) =>
            brand.toLocaleLowerCase().includes(name.toLocaleLowerCase())
          )
        : [...brands]
      ).splice(0, amountShow),
    [name, brands, amountShow]
  );
  const showCategories = useMemo(
    () =>
      nameCategory.length
        ? [...categories].filter((category) =>
            category
              .toLocaleLowerCase()
              .includes(nameCategory.toLocaleLowerCase())
          )
        : [...categories],
    [nameCategory, categories]
  );

  const onReset = () => {
    setName("");
    setNameCategory("");
    setSelectBrands([]);
    setSelectYears(minMaxYears);
    setSelectCategories([]);
  };

  const onSave = () => {
    if (
      selectYears.min > selectYears.max ||
      selectYears.max < selectYears.min ||
      selectYears.min > minMaxYears.max ||
      selectYears.min < minMaxYears.min ||
      selectYears.max > minMaxYears.max ||
      selectYears.max < minMaxYears.min
    )
      return Alert.alert(
        i18n._("Years min: {min}, max: {max}", {
          min: minMaxYears.min,
          max: minMaxYears.max,
        })
      );
    onSubmit({ selectBrands, selectYears, selectCategories });
    return setIsShowFilter(false);
  };

  const renderBrand: ListRenderItem<string> = ({ item, index }) => {
    const isSelect = selectBrands.includes(item);
    return (
      <TouchableOpacity
        key={`brand-${index + 1}`}
        style={[
          styles.itemBrand,
          {
            backgroundColor: isSelect ? "green" : "transparent",
          },
        ]}
        onPress={() => {
          if (isSelect)
            setSelectBrands((state) =>
              [...state].filter((selectBrand) => selectBrand !== item)
            );
          else setSelectBrands((state) => [...state, item]);
        }}
      >
        <Text style={styles.titleItemBrand}>{item}</Text>
      </TouchableOpacity>
    );
  };
  const renderCategory: ListRenderItem<string> = ({ item, index }) => {
    const isSelect = selectCategories.includes(item);
    return (
      <TouchableOpacity
        key={`category-${index + 1}`}
        style={[
          styles.itemBrand,
          {
            backgroundColor: isSelect ? "green" : "transparent",
          },
        ]}
        onPress={() => {
          if (isSelect)
            setSelectCategories((state) =>
              [...state].filter((selectCategory) => selectCategory !== item)
            );
          else setSelectCategories((state) => [...state, item]);
        }}
      >
        <Text style={styles.titleItemBrand}>{item}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setSelectYears(minMaxYears);
  }, [minMaxYears]);

  useEffect(() => {
    if (filterState) {
      setSelectBrands(filterState.selectBrands);
      setSelectYears(filterState.selectYears);
    }
  }, [filterState]);

  return (
    <ModalsSheet
      title={i18n._("Filter")}
      isShow={isShowFilter}
      onClose={() => {
        setIsShowFilter(false);
      }}
      children={
        <ScrollView style={styles.container}>
          <View style={styles.containerBrands}>
            <View style={styles.containerTitleBrands}>
              <Text style={styles.titleBrands}>{i18n._("Brands:")}</Text>
              <Input
                placeholder={i18n._("Enter brand")}
                value={name}
                onChange={setName}
                customStyles={styles.inputBrands}
              />
            </View>
            <FlatList
              data={showBrands}
              horizontal
              renderItem={renderBrand}
              onEndReached={() => {
                setAmountShow((state) => state + 20);
              }}
              contentContainerStyle={styles.containerScrollBrands}
            />
            <View style={styles.containerSelected}>
              <Text style={styles.titleSelected}>
                {i18n._("Selected brands({amountSelectedBrands})", {
                  amountSelectedBrands: selectBrands.length,
                })}
                :{" "}
              </Text>
              {selectBrands.map((brand, index) => {
                const isEnd = selectBrands.length - 1 === index;
                return (
                  <Text
                    key={`select-brand-${index + 1}`}
                    style={styles.itemSelected}
                  >
                    {brand}
                    {isEnd ? "" : ", "}
                  </Text>
                );
              })}
            </View>
          </View>
          <View style={styles.containerEmpty} />
          <View style={styles.containerBrands}>
            <Text style={styles.titleBrands}>{i18n._("Years:")}</Text>
            <View
              style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
            >
              <Input
                placeholder={"Minimum years"}
                value={selectYears.min.toString()}
                onChange={(year) => {
                  setSelectYears((state) => ({ ...state, min: Number(year) }));
                }}
                keyboardType="numeric"
                customStyles={styles.inputBrands}
              />
              <Text style={styles.titleBrands}>{i18n._(" - to - ")}</Text>
              <Input
                placeholder={"Maximum years"}
                value={selectYears.max.toString()}
                onChange={(year) => {
                  setSelectYears((state) => ({ ...state, max: Number(year) }));
                }}
                keyboardType="numeric"
                customStyles={styles.inputBrands}
              />
            </View>
            <Text style={styles.titleSelected}>
              {i18n._("Min: {min}, max: {max}", {
                min: minMaxYears.min,
                max: minMaxYears.max,
              })}
            </Text>
          </View>
          <View style={styles.containerEmpty} />
          <View style={styles.containerBrands}>
            <View style={styles.containerTitleBrands}>
              <Text style={styles.titleBrands}>{i18n._("Categories:")}</Text>
              <Input
                placeholder={i18n._("Enter brand")}
                value={nameCategory}
                onChange={setNameCategory}
                customStyles={styles.inputBrands}
              />
            </View>
            <FlatList
              data={showCategories}
              horizontal
              renderItem={renderCategory}
              onEndReached={() => {
                setAmountShow((state) => state + 20);
              }}
              contentContainerStyle={styles.containerScrollBrands}
            />
            <View style={styles.containerSelected}>
              <Text style={styles.titleSelected}>
                {i18n._("Selected brands({amountSelectedBrands})", {
                  amountSelectedBrands: selectCategories.length,
                })}
                :{" "}
              </Text>
              {selectCategories.map((category, index) => {
                const isEnd = selectCategories.length - 1 === index;
                return (
                  <Text
                    key={`select-brand-${index + 1}`}
                    style={styles.itemSelected}
                  >
                    {category}
                    {isEnd ? "" : ", "}
                  </Text>
                );
              })}
            </View>
          </View>
          <View style={styles.containerEmpty} />
          <View style={styles.containerButtons}>
            <TouchableOpacity style={styles.button} onPress={onReset}>
              <Text style={styles.titleButton}>{i18n._("Reset")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonSave]}
              onPress={onSave}
            >
              <Text style={[styles.titleButton, styles.titleButtonSave]}>
                {i18n._("Save")}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      }
    />
  );
};
