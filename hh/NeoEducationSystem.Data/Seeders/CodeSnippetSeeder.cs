using NeoEducationSystem.Data.Models;

namespace NeoEducationSystem.Data.Seeders
{
	internal class CodeSnippetSeeder : ISeeder
	{
		public async Task SeedAsync(NeoEducationDbContext context, IServiceProvider serviceProvider)
		{
			if (context.CodeSnippets.Any()) return;

			await context.CodeSnippets.AddRangeAsync(new CodeSnippet[]
			{
				// integral types
				new CodeSnippet
				{
					ParagraphId = 2,
					Language = "csharp",
					Code = "int integerNumber = 42;\r\nlong longNumber = 1234567890;"
				},
				new CodeSnippet
				{
					ParagraphId = 2,
					Language = "java",
					Code = "int integerNumber = 42;\r\nlong longNumber = 1234567890L;"
				},

				// floating point
				new CodeSnippet
				{
					ParagraphId = 4,
					Language = "csharp",
					Code = "double floatingPointNumber = 3.14;"
				},
				new CodeSnippet
				{
					ParagraphId = 4,
					Language = "java",
					Code = "double floatingPointNumber = 3.14;"
				},

				// char
				new CodeSnippet
				{
					ParagraphId = 5,
					Language = "csharp",
					Code = "char character = \'A\';",
				},
				new CodeSnippet
				{
					ParagraphId = 5,
					Language = "java",
					Code = "char character = \'A\';",
				},

				// string
				new CodeSnippet
				{
					ParagraphId = 6,
					Language = "csharp",
					Code = "string text = \"Hello, World!\";"
				},
				new CodeSnippet
				{
					ParagraphId = 6,
					Language = "java",
					Code = "String text = \"Hello, World!\";"
				},

				// bool
				new CodeSnippet
				{
					ParagraphId = 7,
					Language = "csharp",
					Code = "bool isTrue = true;"
				},
				new CodeSnippet
				{
					ParagraphId = 7,
					Language = "java",
					Code = "boolean isTrue = true;"
				}
			});

			await context.SaveChangesAsync();
		}
	}
}
