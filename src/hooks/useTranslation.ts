import { useLocalization } from "../contexts/LocalizationContext";
import { getTranslation } from "../utils/translations";

export const useTranslation = () => {
  const { language } = useLocalization();

  const t = (key: string) => {
    return getTranslation(language, key);
  };

  return { t };
};
