import { useState } from "react";
import { Link } from "react-router-dom";

const tabs = [
{ label: "NGN", dropdown: true, options: ["NGN", "USD", "EUR", "GBP"] },
{ label: "Home", link: "/" },
{
label: "Fabric Collections",
dropdown: true,
options: [
{ label: "Company", link: "/company" },
{ label: "Team", link: "/team" },
{ label: "Mission", link: "/mission" },
],
},
{ label: "African Style Inspiration", link: "/african-style-inspiration" },
{ label: "About Us", link: "/about-us" },
{ label: "Contact Us", link: "/contact-us" },
];

function MenuBar() {
const [activeTab, setActiveTab] = useState(tabs[0]);
const [showDropdown, setShowDropdown] = useState(Array(tabs.length).fill(false));
const [selectedCurrency, setSelectedCurrency] = useState("USD");
const [showMenu, setShowMenu] = useState(false);

  function handleTabClick(tab) {
    setActiveTab(tab);
    setShowDropdown(false);
  }

  function handleDropdownClick(index) {
    setShowDropdown((prevState) => {
    const newShowDropdown = [...prevState];
    newShowDropdown[index] = !newShowDropdown[index];
    return newShowDropdown;
  });
  }

  function handleCurrencyChange(currency) {
    setSelectedCurrency(currency);
    setShowDropdown((prevState) => {
    const newShowDropdown = [...prevState];
    newShowDropdown[0] = false; // hide currency dropdown
    return newShowDropdown;
    });
  }

  function handleMenuToggle() {
    setShowMenu((prevState) => !prevState);
  }

return (
    <nav className="flex justify-between items-center mx-auto w-full px-10 pb-10 shadow-md">
      <button
          className="block md:hidden text-gray-900 focus:outline-none"
          onClick={handleMenuToggle}
        >
      ☰
      </button>
      <ul className={`${ showMenu ? "block" : "hidden" } w-full  md:p-0 md:flex md:justify-between sm:justify-center`}>

      {tabs.map((tab, index) => (
      <li
      key={index}
      className={`md:flex cursor-pointer text-center md:text-center sm:text-center items-center flex justify-center w-full ${ activeTab === tab ? "text-gray-900 font-bold" : "text-gray-500" }`}
      onClick={() => handleTabClick(tab)}
      >
      {tab.dropdown ? (
          <div className="relative">
        <span>{tab.label}</span>
        <button
          className="md:ml-2 text-gray-900 focus:outline-none"
          onClick={() => handleDropdownClick(index)}
        >
          ▾
        </button>
        {showDropdown[index] && (
          <ul className="absolute left-0 mt-2 bg-red py-2 rounded-md shadow-lg z-10 dropdown">
            {tab.options.map((option, index) => (
              <li
                key={index}
                className={`px-4 py-2 flex text-center w-fit justify-center cursor-pointer ${ selectedCurrency === option || activeTab === option ? "bg-gray-100 text-gray-900" : "text-gray-700" }`}
                onClick={
                  option.link
                    ? () => handleTabClick(option)
                    : () => handleCurrencyChange(option)
                }
              >
                {option.link ? (
                  <Link to={option.link}>{option.label}</Link>
                ) : (
                  <span>{option.label}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      ) : (
      <Link
      to={tab.link}
      className="px-4 py-2 cursor-pointer"
      >
      {tab.label}
      </Link>
      )}
      </li>
      ))}
      </ul>
    </nav>
);
}
export default MenuBar;