import { BsEmojiFrown, BsEmojiSmile } from "react-icons/bs";

type Props = {};

export const GetInjuredIcon = (injured: boolean) => {
  if (injured == false) {
    return <BsEmojiSmile className="w-10 h-10" />;
  } else {
    return <BsEmojiFrown className="w-10 h-10" />;
  }
};

export const ConvertCmToFeet = (height: string): string => {
  const parts = height.split(" ");
  const heightNumber = Number(parts[0]);
  if (parts.length == 2 && parts[1] === "cm") {
    const calculatedPiece = (heightNumber * 0.0328).toFixed(1);
    return calculatedPiece.replace(".", "'");
  } else {
    return "NaN";
  }
};

export const CalculateShotAcc = (
  total: number = 0,
  onTarget: number = 0
): string => {
  const percentage = ((onTarget! / total!) * 100).toFixed(1);
  if (percentage === "NaN") {
    return "";
  }
  return `${percentage}%`;
};
