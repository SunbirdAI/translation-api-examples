import tw, {styled} from "twin.macro";

export const Nav = styled.div`
  ${tw`
    flex
    fixed
    w-screen
    items-center
    bg-sunbird-navy-blue
    p-6
    sticky
    top-0
    z-50
  `}
`;

export const Title = styled.h1`
  ${tw`
    font-semibold
    text-white
    text-4xl
    md:absolute
    w-full
    right-0
    text-center
    `}
`;
