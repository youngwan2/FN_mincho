// interface PropsType { }

import { FaFlag } from "react-icons/fa";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useState } from "react";


export default function ReportModal() {

    const [reportReason, setReportReason] = useState("")
    const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)



    const handleReport = () => {
        if (reportReason.trim()) {
            alert("신고가 접수되었습니다. 검토 후 조치하겠습니다.")
            setReportReason("")
            setIsReportDialogOpen(false)
        }
    }

    return (
        <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem
                    className="text-red-600 hover:bg-red-50 text-xl"
                    onSelect={(e) => e.preventDefault()}
                >
                    <FaFlag className="w-4 h-4 mr-2" />
                    신고하기
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="bg-white border-green-200">
                <DialogHeader>
                    <DialogTitle className="text-gray-800 text-2xl">게시물 신고</DialogTitle>
                    <DialogDescription className="text-gray-600 text-xl">
                        부적절한 내용이나 잘못된 약초 정보를 신고해주세요.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="report-reason" className="text-gray-700 text-xl">
                            신고 사유
                        </Label>
                        <Textarea
                            id="report-reason"
                            placeholder="신고 사유를 자세히 입력해주세요..."
                            value={reportReason}
                            onChange={(e) => setReportReason(e.target.value)}
                            className="bg-green-50 border-green-200 text-gray-800 focus:border-green-400 py-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setIsReportDialogOpen(false)}
                        className="border-gray-300 text-gray-600 hover:bg-gray-50"
                    >
                        취소
                    </Button>
                    <Button onClick={handleReport} className="bg-green-600 hover:bg-green-700 text-white">
                        신고하기
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}