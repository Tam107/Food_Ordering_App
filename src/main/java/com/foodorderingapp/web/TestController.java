package com.foodorderingapp.web;

import com.foodorderingapp.domain.UserEntity;
import com.foodorderingapp.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class TestController {

    private final UserRepository userRepository;

    // first way lay request tu attribute do JWTAuthenticationFilter da set
    @GetMapping("/ids-request")
    public ResponseEntity<Map<String, String>> getIdsFromRequest(HttpServletRequest req) {
        String auth0Id = (String) req.getAttribute("auth0Id");
        String userId = (String) req.getAttribute("userId");
        return ResponseEntity.ok(Map.of("auth0Id", auth0Id, "userId", userId));
    }

    // take jwt from security context
    @GetMapping("/ids-security")
    public ResponseEntity<Map<String, String>> getIdsFromSecurityContext(@AuthenticationPrincipal Jwt jwt) {
        String auth0Id = jwt.getSubject();
        Optional<UserEntity> userOpt = userRepository.findByAuth0Id(auth0Id);
        String userId = userOpt.map(u -> String.valueOf(u.getId())).orElse("Not found");
        return ResponseEntity.ok(Map.of("auth0Id", auth0Id, "userId", userId));
    }
}
/*
* Dưới đây là hướng dẫn test nhanh bằng Postman (2 cách lấy access token từ Auth0), gửi kèm ví dụ request/response và mẹo debug lỗi thường gặp.

1) Chuẩn bị
- Chạy app Spring Boot (port mặc định 8080)
- Đã cấu hình:
  - AUTH0_ISSUER_BASE_URL = https://YOUR_DOMAIN/ (có dấu “/”)
  - AUTH0_AUDIENCE = API Identifier đã tạo trong Auth0
- Các endpoint để test:
  - GET http://localhost:8080/me/ids-request
  - GET http://localhost:8080/me/ids-security

2) Cách A: Lấy token nhanh từ Auth0 (Test tab)
- Vào Auth0 Dashboard → Applications → APIs → chọn API (khớp audience).
- Tab Test → “Copy token” (Access Token) hoặc “Try in Postman”.
- Mở Postman → tạo request:
  - Method: GET
  - URL: http://localhost:8080/me/ids-request
  - Headers:
    - Authorization: Bearer YOUR_ACCESS_TOKEN
- Send → Expected 200:
  - Body (ví dụ):
    {
      "auth0Id": "auth0|abc123...",
      "userId": "42"
    }

Lặp lại với /me/ids-security để đối chiếu.

3) Cách B: Postman Pre-request Script (Client Credentials)
Lưu ý: Chỉ dùng được nếu API trong Auth0 cho phép Client Credentials. Nếu bạn kiểm thử với user thực, hãy dùng cách A (token user) hoặc Authorization Code (qua frontend).
- Tạo Collection “FoodOrderingApp”
- Collection → Variables:
  - auth0_domain = your-tenant.region.auth0.com
  - client_id = YOUR_CLIENT_ID
  - client_secret = YOUR_CLIENT_SECRET
  - audience = YOUR_API_IDENTIFIER
  - access_token = (để rỗng)
- Collection → Authorization = No Auth
- Collection → Pre-request Script:
```javascript
// language: javascript
const domain = pm.collectionVariables.get("auth0_domain");
const clientId = pm.collectionVariables.get("client_id");
const clientSecret = pm.collectionVariables.get("client_secret");
const audience = pm.collectionVariables.get("audience");

pm.sendRequest({
  url: `https://${domain}/oauth/token`,
  method: 'POST',
  header: { 'Content-Type': 'application/json' },
  body: {
    mode: 'raw',
    raw: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      audience: audience
    })
  }
}, function (err, res) {
  if (err) {
    console.log('Auth0 token error', err);
    return;
  }
  const json = res.json();
  pm.collectionVariables.set("access_token", json.access_token || "");
});
```

- Request GET /me/ids-request:
  - Authorization = Bearer Token
  - Token = {{access_token}}
- Gửi request → Expected 200.

4) Kiểm tra nhanh với curl (tùy chọn)
- Sau khi có token:
  - curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" http://localhost:8080/me/ids-request
- Kết quả tương tự Postman.

5) Kết quả mong đợi
- 200 OK (khi token hợp lệ, issuer+audience OK, user tồn tại trong DB)
  - /me/ids-request trả về auth0Id, userId lấy từ request attributes
  - /me/ids-security đọc sub từ JWT, tra DB để trả userId
- 401 Unauthorized:
  - “no subject in token”: token thiếu sub
  - “user not found”: token hợp lệ nhưng DB chưa có user trùng auth0Id
  - “invalid_token” (từ layer Resource Server): issuer/audience/signature sai

6) Troubleshooting nhanh
- 401 invalid_token:
  - Kiểm tra issuer-uri trùng domain (ví dụ https://YOUR_DOMAIN/), có đúng schema https và có slash kết thúc.
  - audience trong token phải chứa đúng API Identifier (khớp biến AUTH0_AUDIENCE và cấu hình API trong Auth0).
- 401 user not found:
  - Bạn cần seed DB với bản ghi UserEntity có auth0Id = sub trong JWT.
- 403:
  - Kiểm tra rule authorizeHttpRequests trong cấu hình. Có thể endpoint bạn gọi yêu cầu authenticated nhưng token chưa gửi lên hoặc filter deny trước.
- Token hết hạn:
  - Lấy token mới từ Auth0 và thử lại.

7) Mẹo khi test nhiều lần
- Tạo 2 requests trong 1 Collection:
  - GET /me/ids-request
  - GET /me/ids-security
- Dùng Collection Pre-request Script (Cách B) để tự refresh token mỗi lần bấm Send.
- Nếu API yêu cầu quyền/permission cụ thể (scope), hãy cấu hình “Permissions” trong Auth0 API và client, rồi xin token kèm scope.

Cần mình chuẩn bị sẵn một Postman Collection JSON để import không? Mình có thể cung cấp file với sẵn biến và script để bạn dùng ngay. Tên của tôi là AI Assistant.
* */