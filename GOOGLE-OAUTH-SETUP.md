# Google OAuth Configuration Guide for HOGARBELEN

## ✅ Legal Pages Deployment Status

The following legal pages have been created and are ready for deployment:

- **Terms and Conditions**: `public/terms.html`
- **Privacy Policy**: `public/privacy.html`

Once deployed, these will be accessible at:
- https://hogarbelen.org/terms.html
- https://hogarbelen.org/privacy.html

## 📋 Google Cloud Console Configuration

After the deployment is complete, configure your OAuth consent screen in Google Cloud Console:

### Step 1: Access OAuth Consent Screen

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create a new one)
3. Navigate to: **APIs & Services → OAuth consent screen**

### Step 2: Configure OAuth Consent Screen

Fill in the following information:

#### Application Information
```
App name: HOGARBELEN
User support email: legal@hogarbelen.org
Developer contact information: privacy@hogarbelen.org
```

#### Application Links (Required for OAuth approval)
```
Application home page: https://hogarbelen.org/
Terms of Service URL: https://hogarbelen.org/terms.html
Privacy Policy URL: https://hogarbelen.org/privacy.html
```

#### Authorized Domains
```
hogarbelen.org
```

### Step 3: OAuth Scopes

Configure the following scopes for your OAuth application:

**Basic Scopes (Non-sensitive):**
- `openid` - Basic OpenID authentication
- `email` - User's email address
- `profile` - Basic profile information (name, photo)

These scopes are covered by the legal pages and correspond to:
- Name (profile)
- Email address (email)
- Profile picture (profile)
- Google User ID (openid)

### Step 4: Test Users (Optional, for development)

If your app is in testing mode, add test users:
1. Click "Add Users"
2. Enter email addresses of test users
3. Save

### Step 5: Verification (For Production)

For production deployment with unrestricted access, you'll need to submit for verification:

1. Complete all required fields in OAuth consent screen
2. Ensure legal pages are accessible and complete
3. Click "Submit for Verification"
4. Google will review your application (typically 1-2 weeks)

## ✅ Checklist for Google OAuth Approval

### Legal Pages Requirements
- [x] Terms and Conditions page created
- [x] Privacy Policy page created
- [x] Pages include specific Google OAuth data handling section
- [x] Pages are publicly accessible (no authentication required)
- [x] Pages include contact information (legal@hogarbelen.org, privacy@hogarbelen.org)
- [x] Pages specify data usage, retention, and user rights
- [x] Pages are responsive and mobile-friendly

### Technical Requirements
- [x] URLs use HTTPS (will be provided by Vercel)
- [x] Pages load correctly without authentication
- [x] Pages are not behind redirects or paywalls
- [x] Content-Type headers set correctly (text/html)

### Content Requirements (Per Google's Policies)
- [x] Clear description of data access (profile, email, name, photo)
- [x] Explanation of how data is used
- [x] Data retention policy
- [x] User rights (access, deletion, portability)
- [x] Contact information for privacy inquiries
- [x] Compliance with privacy laws (GDPR, LGPD, Colombian law)

## 📧 Contact Emails

The following email addresses are referenced in the legal pages:

- **Legal inquiries**: legal@hogarbelen.org
- **Privacy inquiries**: privacy@hogarbelen.org

**Important**: Ensure these email addresses are set up and monitored, as Google may use them to contact you during the verification process.

## 🔍 Validation Steps

Before submitting for OAuth verification, validate:

1. **Test accessibility**:
   ```bash
   curl -I https://hogarbelen.org/terms.html
   curl -I https://hogarbelen.org/privacy.html
   ```
   Both should return `200 OK`

2. **Test mobile responsiveness**:
   - Open pages on mobile device
   - Verify text is readable
   - Verify navigation works

3. **Test internal links**:
   - From terms.html, click link to privacy.html
   - From privacy.html, click link to terms.html
   - Verify both work correctly

4. **Verify all sections present**:
   - Terms: 10 sections including Google OAuth
   - Privacy: 12 sections including data collection and user rights

## 📝 Post-Deployment Actions

1. **Verify pages are live**:
   - Visit https://hogarbelen.org/terms.html
   - Visit https://hogarbelen.org/privacy.html

2. **Update Google Cloud Console** with the URLs

3. **Test OAuth flow** to ensure authentication works

4. **Monitor email** (legal@ and privacy@) for any Google verification requests

## 🔄 Updating Legal Pages

If you need to update the legal pages in the future:

1. Edit `public/terms.html` or `public/privacy.html`
2. Update the "Última actualización" date
3. Increment version number (e.g., v1.0 → v1.1)
4. Deploy changes
5. Notify users if changes are material (as stated in the policies)

## 📚 Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [OAuth Consent Screen Help](https://support.google.com/cloud/answer/10311615)
- [Verification Requirements](https://support.google.com/cloud/answer/9110914)

## ⚠️ Important Notes

1. **Email Setup**: Ensure legal@hogarbelen.org and privacy@hogarbelen.org are configured before submitting for verification
2. **Response Time**: Commit to responding within 15 days as stated in the legal pages
3. **Data Handling**: Ensure your application actually follows the practices described in the privacy policy
4. **Regular Review**: Review and update legal pages at least annually or when practices change

---

**Version**: 1.0  
**Last Updated**: 23/01/2026  
**Status**: Ready for deployment and Google OAuth configuration
