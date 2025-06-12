import { Select, Option } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import {
  useGetProvincesQuery,
  useGetDistrictsByProvinceQuery,
  useGetAllTypeQuery
} from "../../apis/restaurantApi";

const FilterComponent = ({
  handleSort,
  handlePriceChange,
  handleProvinceChange,
  handleDistrictChange,
  handleTypeChange,
  handleReputationChange
}) => {
  const [sortValue, setSortValue] = useState("priceAsc");
  const [priceValue, setPriceValue] = useState("all");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [reputationFilter, setReputationFilter] = useState("");

  const { data: provinces = [], isLoading: isProvincesLoading } = useGetProvincesQuery();
  const { data: districts = [], isLoading: isDistrictsLoading } = useGetDistrictsByProvinceQuery(
    selectedProvince,
    { skip: !selectedProvince }
  );
  const { data: typesResponse } = useGetAllTypeQuery()


  const restaurantTypes = [
    { value: "", label: "Tất cả" },
    ...(typesResponse?.data?.map(type => ({
      value: type._id,
      label: type.name
    })) || [])
  ];

  const provincesWithDefaultOption = [{ code: "", name: "Khu vực" }, ...provinces];
  const districtsWithDefaultOption = [{ code: "", name: "Khu vực" }, ...districts];

  useEffect(() => {
    setSelectedDistrict("");
    handleProvinceChange(selectedProvince);
    handleDistrictChange("");
  }, [selectedProvince]);

  const handleSortChange = (value) => {
    setSortValue(value);
    handleSort(value);
  };

  const handlePriceChangeInternal = (value) => {
    setPriceValue(value);
    handlePriceChange(value);
  };

  const handleProvinceChangeInternal = (value) => {
    setSelectedProvince(value);
    setSelectedDistrict("");
  };

  const handleDistrictChangeInternal = (value) => {
    handleDistrictChange(value);
  };

  const handleTypeChangeInternal = (value) => {
    setSelectedType(value);
    handleTypeChange(value);
  };
  const handleReputationChangeInternal = (value) => {
    setReputationFilter(value);
    handleReputationChange(value);
  };

  const selectClass = "bg-white shadow-md rounded-xl border border-gray-200";
  const selectWidth = "!min-w-[165px] !w-[175px]"

  return (
    <div className=" flex flex-wrap items-center gap-6 mx-2 mb-4">
      <Select
        className={selectClass}
        label="Nhà hàng"
        value={reputationFilter}
        onChange={handleReputationChangeInternal}
        containerProps={{ className: selectWidth }}
      >
        <Option value="">Tất cả</Option>
        <Option value="true">Nhà hàng uy tín</Option>

      </Select>

      {
        typesResponse?.data && (
          <Select
            className={selectClass}
            label="Loại hình"
            value={selectedType}
            onChange={handleTypeChangeInternal}
            containerProps={{ className: selectWidth }}
          >
            {restaurantTypes.map((type) => (
              <Option key={type.value} value={type.value}>
                {type.label}
              </Option>
            ))}
          </Select>
        )
      }
      <Select
        className={selectClass}
        label="Giá"
        value={priceValue}
        onChange={handlePriceChangeInternal}
        containerProps={{ className: selectWidth }}
      >
        <Option value="all">Tất cả giá</Option>
        <Option value="under_200k">Dưới 200k</Option>
        <Option value="200k_500k">200k - 500k</Option>
        <Option value="500k_1m">500k - 1 triệu</Option>
        <Option value="above_1m">Trên 1 triệu</Option>
      </Select>

      <Select
        className={selectClass}
        label="Phân loại"
        value={sortValue}
        onChange={handleSortChange}
        containerProps={{ className: selectWidth }}
      >
        <Option value="priceAsc">Giá tăng dần</Option>
        <Option value="priceDesc">Giá giảm dần</Option>
      </Select>

      <Select
        className={selectClass}
        label="Tỉnh/Thành phố"
        value=""
        onChange={handleProvinceChangeInternal}
        disabled={isProvincesLoading}
        containerProps={{ className: selectWidth }}
      >
        {provincesWithDefaultOption.map((province) => (
          <Option key={province.code} value={province.code}>{province.name}</Option>
        ))}
      </Select>

      <Select
        className={selectClass}
        label="Quận/Huyện"
        value={selectedDistrict}
        onChange={handleDistrictChangeInternal}
        disabled={isDistrictsLoading || !selectedProvince}
        containerProps={{ className: selectWidth }}
      >
        {districtsWithDefaultOption.map((district) => (
          <Option key={district.code} value={district.code}>{district.name}</Option>
        ))}
      </Select>
    </div>
  );
};

export default FilterComponent;
