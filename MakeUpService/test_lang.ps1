$response = Invoke-WebRequest -Uri "http://localhost:5244/Home/SetLanguage" -Method Post -Body @{ culture="zh-CN"; returnUrl="/" } -MaximumRedirection 0 -ErrorAction SilentlyContinue
if ($response) {
    Write-Output "Status: $($response.StatusCode)"
} else {
    Write-Output "Error: No response"
}
