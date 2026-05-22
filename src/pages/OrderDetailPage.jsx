"use client";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../redux/slices/orderSlice";
import { sendMessage } from "../redux/slices/messageSlice";
import Loader from "../components/Loader";
import {
  FaArrowLeft,
  FaLeaf,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaComment,
} from "react-icons/fa";

const OrderDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [showMessageForm, setShowMessageForm] = useState(false);
  const [message, setMessage] = useState("");

  const { order, loading, error } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, id]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    const receiverId =
      user.role === "consumer" ? order.seller._id : order.consumer._id;

    dispatch(
      sendMessage({
        receiver: receiverId,
        content: message,
        relatedOrder: id,
      })
    );

    setMessage("");
    setShowMessageForm(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-red-800 mb-2">Error Loading Order</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <Link
            to={`/${user?.role === 'farmer' ? 'farmer/' : ''}orders`}
            className="inline-flex items-center text-green-600 hover:text-green-700"
          >
            <FaArrowLeft className="mr-2" />
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-yellow-800 mb-2">Order Not Found</h2>
          <p className="text-yellow-600 mb-4">The order you're looking for doesn't exist or you don't have permission to view it.</p>
          <Link
            to={`/${user?.role === 'farmer' ? 'farmer/' : ''}orders`}
            className="inline-flex items-center text-green-600 hover:text-green-700"
          >
            <FaArrowLeft className="mr-2" />
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Link
        to={`/${user.role == 'farmer' && 'farmer/'}orders`}
        className="inline-flex items-center text-green-600 hover:text-green-700 mb-8 transition-colors duration-200"
      >
        <FaArrowLeft className="mr-2" />
        Back to Orders
      </Link>

      <div className="bg-white shadow-lg rounded-2xl mb-8 overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">
                Order #{order._id.substring(0, 8).toUpperCase()}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt />
                  <span>Placed on {formatDate(order.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock />
                  <span>{new Date(order.createdAt).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <span
                className={`px-6 py-3 rounded-full text-sm font-bold shadow-lg ${getStatusBadgeClass(
                  order.status
                )} bg-white`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Order Summary Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-800 mb-3 uppercase tracking-wide">
                Order Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Items:</span>
                  <span className="font-bold text-gray-900">{order.items.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total Amount:</span>
                  <span className="font-bold text-xl text-blue-600">
                    ₨{order.totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Payment:</span>
                  <span className="capitalize font-medium text-gray-900">
                    {order.paymentMethod.replace("_", " ")}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Info Card */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
              <h3 className="text-sm font-semibold text-purple-800 mb-3 uppercase tracking-wide">
                Customer Information
              </h3>
              <div className="space-y-2">
                <p className="font-bold text-gray-900">{order.consumer.name}</p>
                <p className="text-gray-700 text-sm">{order.consumer.email}</p>
                {order.consumer.phone && (
                  <p className="text-gray-700 text-sm">{order.consumer.phone}</p>
                )}
              </div>
            </div>

            {/* Farmer/Seller Info Card */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
              <h3 className="text-sm font-semibold text-green-800 mb-3 uppercase tracking-wide">
                {order.sellerType === 'admin' ? 'Seller' : 'Farmer'} Information
              </h3>
              <div className="space-y-2">
                <p className="font-bold text-gray-900">{order.seller.name}</p>
                <p className="text-gray-700 text-sm">{order.seller.email}</p>
                {order.seller.phone && (
                  <p className="text-gray-700 text-sm">{order.seller.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Delivery/Pickup Details */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <FaMapMarkerAlt className="text-green-600" />
              {order.pickupDetails && order.pickupDetails.location
                ? "Pickup Details"
                : "Delivery Details"}
            </h2>
            {order.pickupDetails && order.pickupDetails.location ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start bg-white p-4 rounded-lg border border-gray-200">
                  <FaMapMarkerAlt className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Location</p>
                    <p className="text-gray-700 font-medium">
                      {order.pickupDetails.location}
                    </p>
                  </div>
                </div>
                {order.pickupDetails.date && (
                  <div className="flex items-start bg-white p-4 rounded-lg border border-gray-200">
                    <FaCalendarAlt className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Date</p>
                      <p className="text-gray-700 font-medium">
                        {formatDate(order.pickupDetails.date)}
                      </p>
                    </div>
                  </div>
                )}
                {order.pickupDetails.time && (
                  <div className="flex items-start bg-white p-4 rounded-lg border border-gray-200">
                    <FaClock className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Time</p>
                      <p className="text-gray-700 font-medium">
                        {order.pickupDetails.time}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : order.deliveryDetails && order.deliveryDetails.address ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start bg-white p-4 rounded-lg border border-gray-200">
                  <FaMapMarkerAlt className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Address</p>
                    <p className="text-gray-700 font-medium">
                      {order.deliveryDetails.address.street}
                    </p>
                    <p className="text-gray-700">
                      {order.deliveryDetails.address.city},{" "}
                      {order.deliveryDetails.address.state}{" "}
                      {order.deliveryDetails.address.zipCode}
                    </p>
                  </div>
                </div>
                {order.deliveryDetails.date && (
                  <div className="flex items-start bg-white p-4 rounded-lg border border-gray-200">
                    <FaCalendarAlt className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Date</p>
                      <p className="text-gray-700 font-medium">
                        {formatDate(order.deliveryDetails.date)}
                      </p>
                    </div>
                  </div>
                )}
                {order.deliveryDetails.time && (
                  <div className="flex items-start bg-white p-4 rounded-lg border border-gray-200">
                    <FaClock className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Time</p>
                      <p className="text-gray-700 font-medium">
                        {order.deliveryDetails.time}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No delivery/pickup details provided
              </p>
            )}
          </div>

          {/* Order Notes */}
          {order.notes && (
            <div className="mt-6 bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
              <h3 className="text-sm font-semibold text-yellow-800 mb-2 uppercase tracking-wide">
                Order Notes
              </h3>
              <p className="text-gray-700">{order.notes}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl mb-8 overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Order Items ({order.items.length} {order.items.length === 1 ? 'item' : 'items'})
          </h2>
          
          {/* Product Cards for Better Visibility */}
          <div className="space-y-4 mb-6">
            {order.items.map((item, index) => {
              // Get product data from either product or adminProduct
              const productData = item.product || item.adminProduct;
              const productName = item.name || productData?.name || productData?.title || 'Unknown Product';
              const productDescription = productData?.description || '';
              const productImages = productData?.images || [];
              const productCategory = productData?.category;
              const isOrganic = productData?.isOrganic || false;
              
              return (
                <div
                  key={item._id}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <div className="w-full md:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {productImages && productImages.length > 0 ? (
                        <img
                          src={productImages[0] || "/placeholder.svg"}
                          alt={productName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FaLeaf className="text-green-500 text-4xl" />
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-1">
                            {productName}
                          </h3>
                          {productDescription && (
                            <p className="text-gray-600 text-sm line-clamp-2">
                              {productDescription}
                            </p>
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          Item #{index + 1}
                        </span>
                      </div>

                      {/* Product Info Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Unit Price</p>
                          <p className="text-lg font-semibold text-gray-800">
                            ₨{item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Quantity</p>
                          <p className="text-lg font-semibold text-gray-800">
                            {item.quantity} {item.unit || 'kg'}
                          </p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg col-span-2">
                          <p className="text-xs text-green-600 mb-1">Subtotal</p>
                          <p className="text-xl font-bold text-green-600">
                            ₨{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Additional Product Info */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {productCategory && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                            {typeof productCategory === 'object' 
                              ? productCategory.name 
                              : productCategory}
                          </span>
                        )}
                        {isOrganic && (
                          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-1">
                            <FaLeaf className="text-xs" />
                            Organic
                          </span>
                        )}
                        {item.unit && (
                          <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                            Unit: {item.unit}
                          </span>
                        )}
                        {item.adminProduct && (
                          <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                            Marketplace Product
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="border-t-2 border-gray-200 pt-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-gray-700">
                  <span className="text-base">Subtotal ({order.items.length} items):</span>
                  <span className="text-lg font-medium">
                    ₨{order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                  </span>
                </div>
                {order.deliveryFee && (
                  <div className="flex justify-between items-center text-gray-700">
                    <span className="text-base">Delivery Fee:</span>
                    <span className="text-lg font-medium">₨{order.deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                {order.discount && (
                  <div className="flex justify-between items-center text-green-600">
                    <span className="text-base">Discount:</span>
                    <span className="text-lg font-medium">-₨{order.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t-2 border-green-200 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">Total Amount:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ₨{order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Contact {user.role === "consumer" ? (order.sellerType === 'admin' ? "Seller" : "Farmer") : "Customer"}
          </h2>
          {showMessageForm ? (
            <form onSubmit={handleSendMessage} className="space-y-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder={`Write your message to the ${
                  user.role === "consumer" ? (order.sellerType === 'admin' ? "seller" : "farmer") : "customer"
                }...`}
                rows="4"
                required
              ></textarea>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  Send Message
                </button>
                <button
                  type="button"
                  onClick={() => setShowMessageForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowMessageForm(true)}
              className="flex items-center space-x-3 text-green-600 hover:text-green-700 transition-colors duration-200"
            >
              <FaComment className="text-xl" />
              <span className="font-medium">
                Send a message about this order to the{" "}
                {user.role === "consumer" ? (order.sellerType === 'admin' ? "seller" : "farmer") : "customer"}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
