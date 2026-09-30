import { CredentialType } from "@/modules/dashboard/profile/lib/UpdataData";
import UpdateData from "@/modules/dashboard/profile/UpdateCredential/components/organisms/UpdateData";

interface Props {
  params: Promise<{
    type: CredentialType;
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { type, id } = await params;

  return <UpdateData type={type} id={id} />;
}
