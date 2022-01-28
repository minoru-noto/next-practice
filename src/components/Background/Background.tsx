import { NextPage } from "next";

type Props = {
  isOpen: boolean;
  closeHamburgerMenu: () => void;
};

export const Background: NextPage<Props> = ({ isOpen, closeHamburgerMenu }) => {
  const isOpenStyle = isOpen ? "block" : "hidden";

  return (
    <div
      className={`w-full h-full pc:hidden tablet:hidden fixed bg-body opacity-50 cursor-pointer ${isOpenStyle}`}
      onClick={closeHamburgerMenu}
    ></div>
  );
};
