using Microsoft.AspNetCore.Http;

namespace NeoEducationSystem.Services.Data.Images
{
    public interface ICloudinaryService
    {
        string? UploadImage(IFormFile? file);
    }
}
