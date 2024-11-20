'use client';

import React, { useCallback, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

const PdfGridViewer: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [numPages, setNumPages] = useState<number>(0);
    const [loadedPages, setLoadedPages] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    // 파일 업로드 핸들러
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            if (file.size > 10 * 1024 * 1024) {
                alert('파일 크기는 10MB를 초과할 수 없습니다.');
                return;
            }
            setFile(file);
        } else {
            alert('PDF 파일만 업로드 가능합니다.');
        }
    };

    // 페이지 로드 완료 핸들러
    const onLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        const initialPages = Array.from({ length: Math.min(9, numPages) }, (_, i) => i + 1);
        setLoadedPages(initialPages);
    }, []);

    // 스크롤 핸들러: 추가 페이지 로드
    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        if (target.scrollTop + target.clientHeight >= target.scrollHeight - 50) {
            const nextPageStart = loadedPages[loadedPages.length - 1] + 1;
            if (nextPageStart <= numPages) {
                const nextPages = Array.from({ length: 9 }, (_, i) => nextPageStart + i).filter(
                    (page) => page <= numPages
                );
                setLoadedPages((prev) => [...prev, ...nextPages]);
            }
        }
    };

    return (
        <div>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <div
                onScroll={handleScroll}
                style={{
                    height: '80vh',
                    overflowY: 'auto',
                    marginTop: '20px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridAutoRows: '300px',
                    gap: '10px',
                }}
            >
                {file && (
                    <div>
                        <Document file={file} onLoadSuccess={onLoadSuccess}>
                            {loadedPages.map((pageNumber) => (
                                <div
                                    key={pageNumber}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        border: '1px solid #ddd',
                                        padding: '10px',
                                        background: '#f9f9f9',
                                    }}
                                >
                                    <Page pageNumber={pageNumber} width={200} height={280} />
                                </div>
                            ))}
                        </Document>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PdfGridViewer;
