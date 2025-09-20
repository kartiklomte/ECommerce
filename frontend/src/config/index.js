
const RegisterFormControls = [
    {
        name : 'userName',
        label : 'User Name',
        placeholder : 'Enter Your User Name',
        componentType : 'input',
        type : 'text',
        Option : []
    },
    {
        name : 'email',
        label : 'Email',
        placeholder : 'Enter Your Email',
        componentType : 'input',
        type : 'email'
    },
    {
        name : 'password',
        label : 'Password',
        placeholder : 'Enter Your Password',
        componentType : 'input',
        type : 'password'
    }
];

const LoginFormControls = [
    {
        name : 'email',
        label : 'Email',
        placeholder : 'Enter Your Email',
        componentType : 'input',
        type : 'email'
    },
    {
        name : 'password',
        label : 'Password',
        placeholder : 'Enter Your Password',
        componentType : 'input',
        type : 'password'
    }
];

 const addProductFormElements = [
  {
    name: "title",
    label: "Title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    name: "description",
    label: "Description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    name: "category",
    label: "Category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    name: "brand",
    label: "Brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  },
  {
    name: "price",
    label: "Price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    name: "salePrice",
    label: "Sale Price",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    name: "totalStock",
    label: "Total Stock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

//menu items for all the user
 const userViewMenuItems = [
  {
    id : 'home',
    label : 'Home',
    path : '/user/home'
  },
  {
    id : 'men',
    label : 'Men',
    path : '/user/list'
  },
  {
    id : 'women',
    label : 'Women',
    path : '/user/list'
  },
  {
    id : 'kids',
    label : 'Kids',
    path : '/user/list'
  },
  {
    id : 'accessories',
    label : 'Accessories',
    path : '/user/list'
  },
  {
    id : 'footwear',
    label : 'Footwear',
    path : '/user/list'
  },
];

// filters options object
const filterOptions = {
  category : [
    {
      id : 'men',
      label : 'Men'
    },
    {
      id : 'women',
      label : 'Women'
    },
    {
      id : 'kids',
      label : 'Kids'
    },
    {
      id : 'accessories',
      label : 'Accessories'
    },
    {
      id : 'footwear',
      label : 'Footwear'
    }
  ],

  brand : [
    {
      id : 'nike',
      label : 'Nike'
    },
    {
      id : 'adidas',
      label : 'Adidas'
    },
    {
      id : 'puma',
      label : 'Puma'
    },
    {
      id : 'levi',
      label : "Levi's"
    },
    {
      id : 'zara',
      label : 'Zara'
    },
    {
      id : 'h&m',
      label : 'H&M'
    }
  ],
}

// sort optins object
const setOptions = [
  {
    id : "price-lowtohigh",
    label : "Price : Low To High"
  },
  {
    id : "price-hightolow",
    label : "Price : High To Low"
  },
  {
    id : "title-atoz",
    label : "Title : A To Z"
  },
  {
    id : "title-ztoa",
    label : "Price : Z To A"
  }
];

const catagoryOptionMap = {
  'men' : 'Men',
  'women' : 'Women',
  'kids' : 'Kids',
  'accessories' : 'Accessories',
  'footwear' : 'Footwear'
};

const brandOptionMap  = {
  'nike' : 'Nike',
  'adidas' : 'Adidas',
  'pume' : 'Puma',
  'levi' : "Levi's",
  'zara' : 'zara',
  'h&m' : 'H&M'
};

const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "enter your address"
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "enter your city"
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "enter your pincode"
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "enter your phone numver"
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "enter your address"
  }
];

export default RegisterFormControls;
export { LoginFormControls , addProductFormElements , userViewMenuItems , filterOptions , setOptions , catagoryOptionMap , brandOptionMap , addressFormControls}  ;