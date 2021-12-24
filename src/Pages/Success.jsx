import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router"
import { userRequest } from "../requestMethods";
import { Link } from "react-router-dom";



const Success = () => {
    const location = useLocation();
    const data = location.state.stripeData;
    const cart = location.state.products;
    const currentUser = useSelector((state) => state.user.currentUser);
    const [orderId, setOrderId] = useState("");

    useEffect(() => {
        const addOrder = async () => {
            const res = await userRequest.post("/order/add", {
                userId: currentUser.user._id,
                products: cart.products.map((item) => ({
                    productId: item._id,
                    quantity: item.quantity,
                    img: item.img,
                    title: item.title,
                    price: item.price
                })),
                amount: cart.total,
                address: data.billing_details.address
            })
            setOrderId(res.data._id)
        };
        data && addOrder();
    }, [data, cart, currentUser])

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            {orderId ?
                `Order has been successfully created.Your order number is ${orderId}`
                :
                "Order Successfull. Your order is being prepared.."
            }
            <Link to={"/"}>
                <button style={{ padding: "10px", margin: "20px" }}>Go to homepage</button>
            </Link>

        </div>
    )
}

export default Success
