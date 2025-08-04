import { TableCell, TableRow } from "../ui/table";

const EmptyData = ({ text }: { text?: string; }) => {
    return (
        <TableRow>
            <TableCell colSpan={99}>
                <div className="flex items-center justify-center text-center h-20">
                    {text || "Không có dữ liệu"}
                </div>
            </TableCell>
        </TableRow>
    );
};

export default EmptyData;