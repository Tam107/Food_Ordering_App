package com.pm.backendspringboot.application.file;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

public interface FileService {
    Map upload(MultipartFile file, String folderName) throws IOException;
    Map uploadVideo(MultipartFile file, String folderName) throws IOException;

}
