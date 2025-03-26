import { useState } from 'react';
import FileAPI from '../api/FileAPI';

const useFile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Upload a single file
    const uploadFile = async (lessonId: string, file: File) => {
        setLoading(true);
        setError(null);
        try {
            const response = await FileAPI.uploadFile(lessonId, file);
            return response;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || 'Failed to upload file');
        } finally {
            setLoading(false);
        }
    };

    // Upload multiple files
    const uploadFiles = async (lessonId: string, selectedFiles: File[]) => {
        setLoading(true);
        setError(null);
        try {
            const response = await FileAPI.uploadFiles(lessonId, selectedFiles);
            return response;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || 'Failed to upload multiple files');
        } finally {
            setLoading(false);
        }
    };

    // Download a single file
    const downloadFile = async (fileId: string) => {
        setLoading(true);
        setError(null);
        try {
            const fileBlob = await FileAPI.downloadFile(fileId);
            const url = window.URL.createObjectURL(fileBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'filename.ext'; // You may replace this with actual filename
            link.click();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || 'Failed to download file');
        } finally {
            setLoading(false);
        }
    };

    // Fetch and generate download links for multiple files
    const downloadFiles = async (lessonId: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await FileAPI.downloadFiles(lessonId);
            console.log(response);
            return response;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || 'Failed to fetch download links');
        } finally {
            setLoading(false);
        }
    };

    return {
        uploadFile,
        uploadFiles,
        downloadFile,
        downloadFiles,
        loading,
        error,
    };
};

export default useFile;