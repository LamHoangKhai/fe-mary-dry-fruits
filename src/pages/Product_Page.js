import LayoutProduct from '@/components/Layout/LayoutProduct/LayoutProduct';
import Header from '@/components/Layout/Header/Header_Index';

const ProductPage = () => {
    return (
        <div>
            <Header title={'Product'}/>
            <LayoutProduct />
        </div>
    );
};

export default ProductPage;