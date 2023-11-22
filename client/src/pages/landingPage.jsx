import Heading from "../component/heading.component";
import Navbar from "../component/navbar.component";
import OurCategories from "../component/ourCategories.component";
import Sponsors from "../component/sponsors.component";
import Features from "../component/ourFeatures.component";
import ProductCards from "../component/productCard.component";
import PopularProduct from "../component/popularProduct.component";
import Footer from "../component/footer.component";


function LangingPage()  {
    return(
        <>
            <Navbar/>
            <Heading/>
            <Sponsors/>
            <OurCategories/>
            <Features/>
            <ProductCards/>
            <PopularProduct/>
            <Footer/>
        </>
    )
}

export default LangingPage;