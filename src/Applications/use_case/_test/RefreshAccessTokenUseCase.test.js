const RefreshAccessTokenValidator = require('../../validator/RefreshAccessTokenValidator');
const AuthsRepository = require('../../../Domains/auths/AuthsRepository');
const TokenManager = require('../../security/TokenManager');
const RefreshAccessTokenUseCase = require('../RefreshAccessTokenUseCase');

describe('RefreshAccessTokenUseCase', () => {
  it('should orchesting the refresh access token action correctly', async () => {
    const payload = {
      refreshToken: 'refreshToken',
    };

    const expectTokenManager = {
      username: 'andika',
      id: 'user-123',
    };

    const expectAccessToken = {
      accessToken: 'accessToken',
    };

    const mockRefreshAccessTokenValidator = new RefreshAccessTokenValidator();
    const mockTokenManager = new TokenManager();
    const mockAuthsRepository = new AuthsRepository();

    mockRefreshAccessTokenValidator.validate = jest.fn(() => Promise.resolve);
    mockAuthsRepository.checkRefreshToken = jest.fn(() => Promise.resolve);
    mockTokenManager.verifyRefreshToken = jest.fn(() => expectTokenManager);
    mockTokenManager.generateAccessToken = jest.fn(() => expectAccessToken);

    const refreshAccessTokenUseCase = new RefreshAccessTokenUseCase({
      validator: mockRefreshAccessTokenValidator,
      tokenManager: mockTokenManager,
      authsRepository: mockAuthsRepository,
    });

    const result = await refreshAccessTokenUseCase.execute(payload);

    expect(mockRefreshAccessTokenValidator.validate).toBeCalledWith(payload);
    expect(mockAuthsRepository.checkRefreshToken).toBeCalledWith(payload.refreshToken);
    expect(mockTokenManager.verifyRefreshToken).toBeCalledWith(payload.refreshToken);
    expect(mockTokenManager.generateAccessToken).toBeCalledWith(expectTokenManager);
    expect(result).toStrictEqual(expectAccessToken);
  });
});
