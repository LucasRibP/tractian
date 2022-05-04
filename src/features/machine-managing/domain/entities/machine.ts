import AssetResponse from "../../../../core/network/tractian-api/server-responses/asset-response";

interface Machine extends AssetResponse {
  unitName: string;
  companyName: string;
  delegateId?: number;
  delegateName?: string;
}
export default Machine;
