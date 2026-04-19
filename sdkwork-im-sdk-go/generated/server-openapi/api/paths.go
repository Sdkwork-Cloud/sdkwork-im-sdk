package api

import "strings"

const API_PREFIX = "/api/v1"

func ApiPath(path string) string {
    if path == "" {
        return API_PREFIX
    }
    if strings.HasPrefix(path, "http://") || strings.HasPrefix(path, "https://") {
        return path
    }

    normalizedPrefix := strings.TrimSpace(API_PREFIX)
    if normalizedPrefix != "" && normalizedPrefix != "/" {
        normalizedPrefix = "/" + strings.Trim(normalizedPrefix, "/")
    } else {
        normalizedPrefix = ""
    }

    normalizedPath := path
    if !strings.HasPrefix(normalizedPath, "/") {
        normalizedPath = "/" + normalizedPath
    }

    if normalizedPrefix == "" {
        return normalizedPath
    }
    if normalizedPath == normalizedPrefix || strings.HasPrefix(normalizedPath, normalizedPrefix+"/") {
        return normalizedPath
    }
    return normalizedPrefix + normalizedPath
}
