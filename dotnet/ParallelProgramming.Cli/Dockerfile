FROM mcr.microsoft.com/dotnet/runtime:7.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["ParallelProgramming.Cli/ParallelProgramming.Cli.csproj", "ParallelProgramming.Cli/"]
RUN dotnet restore "ParallelProgramming.Cli/ParallelProgramming.Cli.csproj"
COPY . .
WORKDIR "/src/ParallelProgramming.Cli"
RUN dotnet build "ParallelProgramming.Cli.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ParallelProgramming.Cli.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ParallelProgramming.Cli.dll"]
