import tw, {styled} from "twin.macro";

export const TextArea = styled.textarea`
  ${tw`
    w-full
    h-full
    h-60 md:h-80
    px-3
    py-1.5
    font-normal
    text-2xl md:text-4xl
    text-gray-700
    rounded
    transition
    placeholder:text-4xl
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
   `}
  
  //clip-path: inset(0 3ch 0 0);
  //animation: l 1s steps(4) infinite;
  //
  //@keyframes l {
  //  to {
  //    clip-path: inset(0 -1ch 0 0);
  //  }
  //}
`;

export const LanguageDropdown = styled.select`
  ${tw`
    px-3
    py-1.5
    mx-3
    my-1.5
    max-w-[250px]
    overflow-hidden
    break-normal
    border border-solid border-gray-300
    rounded
    ease-in-out
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
    `}
`;
