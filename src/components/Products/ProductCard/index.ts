import _ProductCard from "./ProductCard";
import ProductCardImage from "./ProductCardImage";
import ProductCardTitle from "./ProductCardTitle";
import ProductCardText from "./ProductCardText";

const ProductCard = Object.assign(_ProductCard, {
	Image: ProductCardImage,
	Title: ProductCardTitle,
	Text: ProductCardText,
});

export default ProductCard;
