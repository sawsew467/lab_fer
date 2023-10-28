import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import Menu from "./MenuComponent";
import DishDetail from "./DishdetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";

class Main extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dishes: DISHES,
			comments: COMMENTS,
			promotions: PROMOTIONS,
			leaders: LEADERS,
		};
	}

	render() {
		const HomePage = () => {
			return (
				<Home
					dish={this.state.dishes.filter((dish) => dish.featured)[0]}
					promotion={
						this.state.promotions.filter(
							(promo) => promo.featured
						)[0]
					}
					leader={
						this.state.leaders.filter(
							(leader) => leader.featured
						)[0]
					}
				/>
			);
		};

		const DishWithId = () => {
			const { dishId } = useParams();
			return (
				<DishDetail
					dish={
						this.state.dishes.filter(
							(dish) => dish.id === parseInt(dishId, 10)
						)[0]
					}
					comments={this.state.comments.filter(
						(comment) => comment.dishId === parseInt(dishId, 10)
					)}
				/>
			);
		};

		return (
			<div>
				<Header />
				<Routes>
					<Route path="/home" element={<HomePage />} />
					<Route
						path="/aboutus"
						element={<About leaders={this.state.leaders} />}
					/>
					<Route
						path="/menu"
						element={<Menu dishes={this.state.dishes} />}
					/>
					<Route path="/menu/:dishId" element={<DishWithId />} />
					<Route path="/contactus" element={<Contact />} />
					<Route path="*" element={<HomePage />} />
				</Routes>
				<Footer />
			</div>
		);
	}
}

export default Main;
