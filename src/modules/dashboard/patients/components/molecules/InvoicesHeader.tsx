import Button from "@/shared/components/atoms/Button";
import Header from "@/shared/components/molecules/Header";

interface Props {
  btnTitle: string;
  title: string;
  onClick: () => void;
}

const InvoicesHeader = ({ btnTitle, title, onClick }: Props) => {
  return (
    <div className="flex items-center justify-between gap-3">
      <Header title={title} />

      <Button
        variant="primary"
        size="sm"
        className="shrink-0"
        onClick={onClick}
      >
        {btnTitle}
      </Button>
    </div>
  );
};

export default InvoicesHeader;
