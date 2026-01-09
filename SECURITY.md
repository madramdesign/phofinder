# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Security Best Practices

### Environment Variables

**Never commit sensitive data to the repository!**

- Keep `.env.local` out of version control (already in `.gitignore`)
- Use `.env.example` as a template for required variables
- Store actual credentials in deployment platform (Vercel, Netlify, etc.)

### Firebase Security

- Firestore rules restrict writes to authenticated users only
- Anonymous authentication is used for community participation
- Public read access is enabled for browsing restaurants
- Review and rating submissions require authentication

### Sensitive Files

The following files are excluded from the repository:
- `.env.local` - Contains Firebase credentials
- `.firebaserc` - Contains Firebase project configuration
- `.vercel.env` - Contains deployment environment variables
- `.firebase/` - Firebase deployment cache

## Reporting Security Issues

If you discover a security vulnerability, please:
1. **Do not** open a public issue
2. Email security concerns to the repository maintainer
3. Provide details about the vulnerability
4. Allow time for the issue to be addressed before public disclosure

## Security Configuration

### Firestore Rules

Firestore security rules are configured in `firestore.rules`:
- Read access: Public (anyone can browse restaurants)
- Write access: Authenticated users only
- User-specific writes: Users can only edit their own reviews/ratings

### Authentication

- Anonymous authentication is enabled for easy community participation
- No personal information is required to submit restaurants or reviews
- User IDs are generated automatically and cannot be traced back to individuals

## Best Practices for Deployment

1. **Never commit `.env.local`** - Always use environment variables in your deployment platform
2. **Use `.env.example`** - Share the template, not actual values
3. **Rotate credentials** - If credentials are exposed, regenerate them in Firebase Console
4. **Review Firestore rules** - Ensure rules are properly deployed before going public
5. **Monitor submissions** - Regularly check Firebase Console for unusual activity

## Additional Resources

- [Firebase Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [OWASP Security Guidelines](https://owasp.org/www-project-top-ten/)
