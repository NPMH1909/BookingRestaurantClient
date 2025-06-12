import {
    Card,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import Pagination from "../shared/Pagination";
import MenuItemModal from "./MenuItemModal";

const MenuSection = ({
    typeFilters,
    menuSectionRef,
    menus,
    menuPage,
    setMenuPage,
    handleCategoryClick,
    handleItemModalClick,
    handleAddToCart,
    isDialogOpen,
    handleCloseDialog,
    selectedItem,
    selectedCategory
}) => {

    return (
        <Card ref={menuSectionRef} className="mt-4">
            <CardBody className="">
                <Typography variant="h3" color="black" className="mb-6">
                    Thực đơn nhà hàng
                </Typography>

                <div className="overflow-x-auto">
                    <div className="flex items-center border-b border-gray-300 text-sm font-medium text-gray-700">
                        {typeFilters.map(({ label, value }, index, array) => (
                            <div key={value || 'all'} className="flex items-center">
                                <button
                                    onClick={() => handleCategoryClick(value)}
                                    className={`pb-2 px-2 font-medium transition-all duration-200 ${selectedCategory === value
                                        ? '!text-red-600 border-b-2 border-red-600'
                                        : 'text-gray-700 border-b-2 border-transparent hover:text-red-500'
                                        }`}
                                >
                                    {label}
                                </button>
                                {index !== array.length - 1 && (
                                    <span className="text-gray-300 px-1">|</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {menus?.data?.map((item) => (
                        <div
                            key={item?._id}
                            className="flex items-center justify-between gap-4 border-b pb-4"
                        >
                            <div
                                className="flex items-center gap-4 flex-1 cursor-pointer"
                                onClick={() => handleItemModalClick(item)}
                            >
                                <img
                                    src={item?.image.url}
                                    alt={item?.name}
                                    className="h-20 w-20 object-cover rounded-md"
                                />
                                <div className="flex flex-col justify-center">
                                    {item?.promotion?.discountPercent ? (
                                        <div className="text-[#FF333a] font-semibold text-md">
                                            {(item?.price * (1 - item?.promotion?.discountPercent / 100)).toLocaleString("en-US")} đ{" "}
                                            <span className="line-through text-sm text-gray-400 ml-1">
                                                {item?.price.toLocaleString("en-US")} đ
                                            </span>{" "}
                                            /{item?.unit}
                                        </div>
                                    ) : (
                                        <div className="text-[#FF333a] font-semibold text-md">
                                            {item?.price.toLocaleString("en-US")} đ /{item?.unit}
                                        </div>
                                    )}
                                    <spam className="text-gray-800 text-sm">{item?.name}</spam>
                                </div>
                            </div>

                            <Button
                                variant="outlined"
                                className="h-10 border-[#FF333a] text-[#FF333a] px-4"
                                color="red"
                                onClick={() => handleAddToCart(item)}
                            >
                                Thêm vào giỏ
                            </Button>
                        </div>
                    ))}
                </div>


                {menus?.pagination?.totalPages > 1 && (
                    <div className="mt-10 flex justify-center">
                        <Pagination
                            page={menus?.pagination?.totalPages}
                            active={menuPage}
                            setActive={setMenuPage}
                        />
                    </div>
                )}

                <MenuItemModal
                    isDialogOpen={isDialogOpen}
                    handleCloseDialog={handleCloseDialog}
                    item={selectedItem}
                />
            </CardBody>
        </Card>
    );
};

export default MenuSection;
