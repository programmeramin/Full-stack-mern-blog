import { Edit, Home, Phone, User2 } from "lucide-react";

export const mockUser = {
  name: "Elon Mask",
  username: "elon_mask",
  email: "elonmask@gmail.com",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/f/f4/USAFA_Hosts_Elon_Musk_%28Image_1_of_17%29_%28cropped%29.jpg",
  isAdmin: true,
};

export const navLinks = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Blogs",
    href: "/blogs",
    icon: Edit,
  },
  {
    label: "About",
    href: "/about",
    icon: User2,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: Phone,
  },
];

export const BASE_URL = 'http://localhost:5050/api';

export const placeholderUserImage = "/placeholder-user.webp";

export const headerHeight = 70;
